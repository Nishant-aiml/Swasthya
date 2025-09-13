interface ProfileData {
  name: string;
  gender: string;
  age: string;
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  medicalHistory: string;
  medications: any[];
  surgeries: any[];
  allergies: any[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactAlternativePhone: string;
}

export async function updateProfile(data: ProfileData): Promise<void> {
  try {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}
