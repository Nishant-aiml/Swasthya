import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface Medicine {
  brandName: string;
  genericName: string;
  alternatives: Alternative[];
  category: string;
  usedFor: string;
}

interface Alternative {
  name: string;
  manufacturer: string;
  price: number;
  dosage: string;
  savings: number;
}

const medicineDatabase: Medicine[] = [
  {
    brandName: "Crocin",
    genericName: "Paracetamol",
    category: "Pain Relief & Fever",
    usedFor: "Fever, Headache, Body Pain",
    alternatives: [
      {
        name: "Dolo 650",
        manufacturer: "Micro Labs Ltd",
        price: 30,
        dosage: "650mg",
        savings: 5
      },
      {
        name: "P-650",
        manufacturer: "Mankind Pharma",
        price: 25,
        dosage: "650mg",
        savings: 10
      },
      {
        name: "Fepanil",
        manufacturer: "Cipla",
        price: 28,
        dosage: "650mg",
        savings: 7
      }
    ]
  },
  {
    brandName: "Allegra",
    genericName: "Fexofenadine",
    category: "Antiallergic",
    usedFor: "Allergies, Cold, Rhinitis",
    alternatives: [
      {
        name: "Fexova",
        manufacturer: "Cipla",
        price: 75,
        dosage: "120mg",
        savings: 45
      },
      {
        name: "Fexo",
        manufacturer: "Sun Pharma",
        price: 68,
        dosage: "120mg",
        savings: 52
      }
    ]
  },
  {
    brandName: "Pantop",
    genericName: "Pantoprazole",
    category: "Acidity & Gastric Relief",
    usedFor: "Acidity, GERD, Ulcers",
    alternatives: [
      {
        name: "Pan 40",
        manufacturer: "Alkem",
        price: 85,
        dosage: "40mg",
        savings: 35
      },
      {
        name: "Pantin",
        manufacturer: "Cipla",
        price: 78,
        dosage: "40mg",
        savings: 42
      }
    ]
  },
  {
    brandName: "Augmentin",
    genericName: "Amoxicillin + Clavulanic Acid",
    category: "Antibiotics",
    usedFor: "Bacterial Infections",
    alternatives: [
      {
        name: "Moxikind-CV",
        manufacturer: "Mankind",
        price: 180,
        dosage: "625mg",
        savings: 120
      },
      {
        name: "Clavam",
        manufacturer: "Alkem",
        price: 165,
        dosage: "625mg",
        savings: 135
      }
    ]
  },
  {
    brandName: "Telma",
    genericName: "Telmisartan",
    category: "Blood Pressure",
    usedFor: "Hypertension",
    alternatives: [
      {
        name: "Telvas",
        manufacturer: "Aristo",
        price: 95,
        dosage: "40mg",
        savings: 55
      },
      {
        name: "Telmikind",
        manufacturer: "Mankind",
        price: 88,
        dosage: "40mg",
        savings: 62
      }
    ]
  },
  {
    brandName: "Glycomet",
    genericName: "Metformin",
    category: "Diabetes",
    usedFor: "Type 2 Diabetes",
    alternatives: [
      {
        name: "Glucophage",
        manufacturer: "Franco-Indian",
        price: 45,
        dosage: "500mg",
        savings: 25
      },
      {
        name: "Gluformin",
        manufacturer: "Ipca",
        price: 42,
        dosage: "500mg",
        savings: 28
      }
    ]
  },
  {
    brandName: "Restyl",
    genericName: "Alprazolam",
    category: "Mental Health",
    usedFor: "Anxiety, Panic Disorders",
    alternatives: [
      {
        name: "Alprax",
        manufacturer: "Torrent",
        price: 55,
        dosage: "0.5mg",
        savings: 35
      },
      {
        name: "Alzolam",
        manufacturer: "Cipla",
        price: 48,
        dosage: "0.5mg",
        savings: 42
      }
    ]
  }
];

export default function AlternativeMedicineFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Medicine[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const results = medicineDatabase.filter(medicine =>
      medicine.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setShowResults(true);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Generic Alternatives</h2>
          <p className="text-gray-600">
            Search for your medicine to find more affordable generic alternatives
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Enter medicine name (e.g., Crocin, Allegra)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white">
            Search
          </Button>
        </div>

        {showResults && (
          <div className="space-y-6">
            {searchResults.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No alternatives found. Try searching with a different medicine name.</p>
              </div>
            ) : (
              searchResults.map((medicine) => (
                <div key={medicine.brandName} className="bg-white rounded-lg shadow-md p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{medicine.brandName}</h3>
                    <p className="text-gray-600">Generic Name: {medicine.genericName}</p>
                    <div className="mt-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {medicine.category}
                      </span>
                      <p className="text-gray-600 mt-2">Used for: {medicine.usedFor}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Generic Alternatives</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      {medicine.alternatives.map((alt) => (
                        <div
                          key={alt.name}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-medium text-gray-900">{alt.name}</h5>
                              <p className="text-sm text-gray-600">{alt.manufacturer}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-600">₹{alt.price}</p>
                              <p className="text-sm text-green-600">Save ₹{alt.savings}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">Dosage: {alt.dosage}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}