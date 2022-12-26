import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SectionList, Text, useToast } from 'native-base';
import { Heading, VStack } from 'native-base';

import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';

import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { AppError } from '@utils/AppError';
import { api } from '@services/api';

export function History() {

    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const toast = useToast();

    async function fetchHistory() {
        try {
            setIsLoading(true);
            const response = await api.get('/history');
            console.log(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : 'Não foi possível carregar o histórico';

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(useCallback(() => {
        fetchHistory();
    }, []));

    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios" />

            <SectionList
                sections={exercises}
                keyExtractor={(item: ExerciseDTO) => item.id}
                renderItem={({ item }) => (
                    <HistoryCard />
                )}
                renderSectionHeader={({ section }) => (
                    <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
                        { section.title }
                    </Heading>
                )}
                px={8}
                contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
                ListEmptyComponent={() => (
                    <Text color="gray.100" textAlign="center">
                        Ainda não há exercícios registrados. {"\n"}
                        Vamos treinar hoje?
                    </Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </VStack>
    );
}
