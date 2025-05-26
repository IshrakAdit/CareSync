
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Hospital as HospitalType } from '@/types';
import { MapPin, Phone, Star } from 'lucide-react';

interface HospitalCardProps {
  hospital: HospitalType;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  return (
    <Link to={`/hospitals/${hospital.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{hospital.name}</CardTitle>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{hospital.rating}</span>
            </div>
          </div>
          <Badge variant="secondary" className="w-fit">
            {hospital.type}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">{hospital.address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm">{hospital.phone_number}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HospitalCard;
