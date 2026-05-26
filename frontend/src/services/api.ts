import axios from 'axios';
import { Exercise, Injury, ModificationResponse, ApiResponse, Language } from '../types';

const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

export const apiService = {
    // Health check
    async checkHealth(): Promise<boolean> {
        try {
            const response = await api.get('/health');
            return response.status === 200;
        } catch (error) {
            console.error('Health check failed:', error);
            return false;
        }
    },

    // Get all exercises
    async getExercises(language: Language = 'en'): Promise<Exercise[]> {
        try {
            const response = await api.get<ApiResponse<Exercise[]>>('/exercises', {
                params: { lang: language }
            });
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch exercises:', error);
            throw error;
        }
    },

    // Get specific exercise
    async getExercise(id: string, language: Language = 'en'): Promise<Exercise> {
        try {
            const response = await api.get<ApiResponse<Exercise>>(`/exercises/${id}`, {
                params: { lang: language }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Failed to fetch exercise ${id}:`, error);
            throw error;
        }
    },

    // Get all injuries
    async getInjuries(language: Language = 'en'): Promise<Injury[]> {
        try {
            const response = await api.get<ApiResponse<Injury[]>>('/injuries', {
                params: { lang: language }
            });
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch injuries:', error);
            throw error;
        }
    },

    // Get modifications for exercise and injury
    async getModifications(
        exerciseId: string,
        injuryId: string,
        language: Language = 'en'
    ): Promise<ModificationResponse> {
        try {
            const response = await api.get<ApiResponse<ModificationResponse>>('/modifications', {
                params: {
                    exerciseId,
                    injuryId,
                    lang: language
                }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Failed to fetch modifications for ${exerciseId} and ${injuryId}:`, error);
            throw error;
        }
    }
};

export default apiService;