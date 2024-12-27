import { API_URL } from '@/constants/config';
import axios from 'axios';

export class ProgramsApi {
  async getAllPrograms(limit?: number) {
    try {
      const response = await fetch(
        `${API_URL}/admission-programs-with-filters?depth=5${limit ? `&limit=${limit}` : ''}`,
        {
          next: {
            revalidate: 3600 // 1 hour in seconds
          }
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Unexpected error:', error);
      throw error;
    }
  }

  async getCampusPrograms(campusId: string) {
    try {
      const response = await axios.get(
        // `${API_URL}/admission-programs-with-filters?depth=2&where[program.campus_id][equals]=${campusId}`
        `${API_URL}/admission_programs?where[program.campus_id][equals]=${campusId}&limit=500`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      throw error;
    }
  }

  async getProgram(id: string) {
    try {
      const response = await axios.get(
        `${API_URL}/admission_programs/${id}?depth=5`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      throw error;
    }
  }

  async getFeeStructure(programId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/fee_structures?depth=0&draft=true&limit=10&page=1&where[or][0][and][0][program_id][equals]=${programId}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      throw error;
    }
  }
}
