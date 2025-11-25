import { MapPin, Phone, Mail, Globe, Shield, Clock, Users } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About CivicPulse</h3>
          <p className="text-sm text-gray-300">
            CivicPulse helps you report civic issues and get them resolved faster, empowering communities and improving urban living.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Kodambakam Chennai - 24</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91 63811 61445</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>support@civicpulse.com</span>
            </li>
          </ul>
        </div>

        {/* Mission Statement */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Mission</h3>
          <p className="text-sm text-gray-300">
            To improve civic infrastructure by enabling citizens to report problems easily and track their resolution, making cities cleaner, safer, and smarter.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © 2024 CivicPulse. All rights reserved. | Privacy Policy | Terms of Service
      </div>
    </footer>
  );
}
