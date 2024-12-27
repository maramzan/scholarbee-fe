import { API_URL } from '@/constants/config';
import axios, { AxiosError } from 'axios';

export class UtilsApi {
  token: string;
  constructor(token: string) {
    this.token = token;
  }

  async uploadMedia(formData: FormData) {
    try {
      const response = await axios.post(`${API_URL}/media`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.token}`
        }
      });
      console.log('response on get utils Api', response);
      if (response.status === 201) {
        console.log('response.data', response.data);
        return {
          success: true,
          data: response.data,
          message: 'Media uploaded successfully'
        };
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      if (error) {
        console.log('error befor returning', {
          success: false,
          data: (error as AxiosError)?.response?.data,
          message: 'Error While Uploading Media'
        });
        return {
          success: false,
          data: (error as AxiosError)?.response?.data,
          message: 'Error While Uploading Media'
        };
      }

      throw error;
    }
  }
}
