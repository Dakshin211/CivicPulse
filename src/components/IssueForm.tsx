import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Camera, Upload, ArrowLeft, Loader2 } from 'lucide-react';
import { useCivic } from '@/contexts/CivicContext';

interface IssueFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function IssueForm({ onBack, onSuccess }: IssueFormProps) {
  const { submitIssue } = useCivic();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    photo: null as string | null,
    location: {
      lat: 0,
      lng: 0,
      address: ''
    }
  });

  const [locationLoading, setLocationLoading] = useState(false);

  const handlePhotoUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          photo: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const getLocation = useCallback(() => {
    setLocationLoading(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const realAddress = data.display_name || "Unknown Address";

            setFormData(prev => ({
              ...prev,
              location: {
                lat: latitude,
                lng: longitude,
                address: realAddress
              }
            }));
          } catch (error) {
            console.error('Reverse geocoding failed:', error);
            setFormData(prev => ({
              ...prev,
              location: {
                lat: latitude,
                lng: longitude,
                address: "Failed to get address"
              }
            }));
          }

          setLocationLoading(false);
        },
        () => {
          // Fallback location
          setFormData(prev => ({
            ...prev,
            location: {
              lat: 40.7128,
              lng: -74.0060,
              address: "123 City Hall Plaza, Downtown"
            }
          }));
          setLocationLoading(false);
        }
      );
    } else {
      // Fallback location
      setFormData(prev => ({
        ...prev,
        location: {
          lat: 40.7128,
          lng: -74.0060,
          address: "123 City Hall Plaza, Downtown"
        }
      }));
      setLocationLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    submitIssue(formData);
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button
          variant="outline"
          onClick={onBack}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Button>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Report a Community Issue</CardTitle>
            <p className="text-muted-foreground">
              Help us improve your community by providing detailed information about the issue.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-base font-medium">
                  Issue Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail (e.g., 'Large pothole on Main Street causing traffic delays')"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  className="mt-2 min-h-[100px]"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <Label className="text-base font-medium">Upload Photo</Label>
                <div className="mt-2">
                  {formData.photo ? (
                    <div className="relative">
                      <img
                        src={formData.photo}
                        alt="Issue photo"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setFormData(prev => ({ ...prev, photo: null }))}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                      </div>
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <Label className="text-base font-medium">Location</Label>
                <div className="mt-2 space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getLocation}
                    disabled={locationLoading}
                    className="w-full flex items-center space-x-2"
                  >
                    {locationLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                    <span>
                      {locationLoading ? 'Getting Location...' : 'Use Current Location'}
                    </span>
                  </Button>

                  {formData.location.address && (
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <p className="text-sm font-medium text-accent-foreground">
                        📍 {formData.location.address}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Lat: {formData.location.lat.toFixed(4)}, 
                        Lng: {formData.location.lng.toFixed(4)}
                      </p>
                    </div>
                  )}

                  <Input
                    placeholder="Or enter address manually"
                    value={formData.location.address}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, address: e.target.value }
                    }))}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !formData.description || !formData.location.address}
                className="w-full bg-gradient-civic hover:opacity-90 transition-all duration-300"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting Report...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Issue Report
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
