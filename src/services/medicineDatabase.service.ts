import axios from 'axios';

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  category: string;
  description: string;
  usages: string[];
  sideEffects: string[];
  warnings: string[];
  interactions: string[];
  dosageForm: string;
  strength: string;
  manufacturer: string;
  prescriptionRequired: boolean;
}

export interface MedicineSearchParams {
  query?: string;
  category?: string;
  genericName?: string;
  prescriptionRequired?: boolean;
}

// Using the FDA API and RxNorm API for comprehensive medicine data
const FDA_API_URL = 'https://api.fda.gov/drug';
const RXNORM_API_URL = 'https://rxnav.nlm.nih.gov/REST';

export class MedicineDatabaseService {
  static async searchMedicines(params: MedicineSearchParams): Promise<Medicine[]> {
    try {
      // Search FDA database
      const fdaResponse = await axios.get(`${FDA_API_URL}/ndc.json`, {
        params: {
          search: params.query,
          limit: 100
        }
      });

      // Search RxNorm for additional generic name information
      const rxnormResponse = await axios.get(`${RXNORM_API_URL}/drugs`, {
        params: {
          name: params.query
        }
      });

      // Combine and format the results
      const medicines = await this.combineMedicineData(fdaResponse.data, rxnormResponse.data);
      
      return this.filterMedicines(medicines, params);
    } catch (error) {
      console.error('Medicine database error:', error);
      throw new Error('Failed to search medicines');
    }
  }

  static async getMedicineDetails(id: string): Promise<Medicine> {
    try {
      const [fdaDetails, rxnormDetails] = await Promise.all([
        axios.get(`${FDA_API_URL}/ndc/${id}.json`),
        axios.get(`${RXNORM_API_URL}/rxcui/${id}/allProperties.json`)
      ]);

      return this.formatMedicineDetails(fdaDetails.data, rxnormDetails.data);
    } catch (error) {
      console.error('Medicine details error:', error);
      throw new Error('Failed to get medicine details');
    }
  }

  static async getInteractions(medicineIds: string[]): Promise<string[]> {
    try {
      const response = await axios.get(`${RXNORM_API_URL}/interaction/list.json`, {
        params: {
          rxcuis: medicineIds.join('+')
        }
      });

      return this.formatInteractions(response.data);
    } catch (error) {
      console.error('Medicine interactions error:', error);
      throw new Error('Failed to get medicine interactions');
    }
  }

  private static async combineMedicineData(fdaData: any, rxnormData: any): Promise<Medicine[]> {
    // Combine and normalize data from both sources
    return fdaData.results.map((fda: any) => ({
      id: fda.product_ndc,
      name: fda.brand_name,
      genericName: fda.generic_name,
      brandNames: [fda.brand_name],
      category: fda.pharm_class?.[0] || 'Unknown',
      description: fda.description || '',
      usages: fda.indications_and_usage || [],
      sideEffects: fda.adverse_reactions || [],
      warnings: fda.warnings || [],
      interactions: fda.drug_interactions || [],
      dosageForm: fda.dosage_form,
      strength: fda.active_ingredients?.[0]?.strength || '',
      manufacturer: fda.manufacturer_name,
      prescriptionRequired: fda.prescription_required || false
    }));
  }

  private static filterMedicines(medicines: Medicine[], params: MedicineSearchParams): Medicine[] {
    return medicines.filter(medicine => {
      if (params.category && medicine.category !== params.category) return false;
      if (params.genericName && medicine.genericName !== params.genericName) return false;
      if (params.prescriptionRequired !== undefined && 
          medicine.prescriptionRequired !== params.prescriptionRequired) return false;
      return true;
    });
  }

  private static formatMedicineDetails(fdaData: any, rxnormData: any): Medicine {
    // Format and combine detailed information
    return {
      id: fdaData.product_ndc,
      name: fdaData.brand_name,
      genericName: fdaData.generic_name,
      brandNames: [fdaData.brand_name],
      category: fdaData.pharm_class?.[0] || 'Unknown',
      description: fdaData.description || '',
      usages: fdaData.indications_and_usage || [],
      sideEffects: fdaData.adverse_reactions || [],
      warnings: fdaData.warnings || [],
      interactions: fdaData.drug_interactions || [],
      dosageForm: fdaData.dosage_form,
      strength: fdaData.active_ingredients?.[0]?.strength || '',
      manufacturer: fdaData.manufacturer_name,
      prescriptionRequired: fdaData.prescription_required || false
    };
  }

  private static formatInteractions(data: any): string[] {
    // Format interaction data
    return data.fullInteractionTypeGroup?.[0]?.fullInteractionType?.map(
      (interaction: any) => interaction.comment
    ) || [];
  }
}
