
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import HospitalSearch from '@/components/hospitals/HospitalSearch';
import HospitalCard from '@/components/hospitals/HospitalCard';
import { Hospital, SearchFilters } from '@/types';
import { dummyApiClient as apiClient } from '@/lib/api_dummy';
import { toast } from '@/hooks/use-toast';

const HospitalsPage: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockHospitals: Hospital[] = [
      {
        id: 1,
        name: "Dhaka Medical College Hospital",
        address: "Secretariat Road, Dhaka",
        phone_number: "+88-02-8626812",
        rating: 4.5,
        location: "Dhaka",
        type: "Public",
        icus: 50
      },
      {
        id: 2,
        name: "Square Hospital",
        address: "18/F, Bir Uttam Qazi Nuruzzaman Sarak",
        phone_number: "+88-02-8159457",
        rating: 4.8,
        location: "Dhaka",
        type: "Private",
        icus: 30
      },
      {
        id: 3,
        name: "Apollo Hospitals Dhaka",
        address: "Plot 81, Block E, Bashundhara",
        phone_number: "+88-02-8401661",
        rating: 4.7,
        location: "Dhaka",
        type: "Private",
        icus: 40
      }
    ];
    setHospitals(mockHospitals);
  }, []);

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true);
    try {
      // In a real app, this would call the API
      // const response = await apiClient.searchHospitals(filters);
      // setHospitals(response.data);
      
      // For now, we'll simulate filtering the mock data
      console.log('Searching with filters:', filters);
      toast({
        title: "Search completed",
        description: `Found ${hospitals.length} hospitals`,
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Hospitals</h1>
          <p className="text-gray-600">Discover the best healthcare facilities near you</p>
        </div>

        <HospitalSearch onSearch={handleSearch} isLoading={isLoading} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>

        {hospitals.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hospitals found. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HospitalsPage;
