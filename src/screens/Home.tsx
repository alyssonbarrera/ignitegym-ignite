import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HStack, VStack, FlatList, Heading, Text } from 'native-base';

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import Image1 from '../assets/image-1.png';
import Image2 from '../assets/image-2.png';
import Image3 from '../assets/image-3.png';
import Image4 from '../assets/image-4.png';

export function Home() {

    const [groupSelected, setGroupSelected] = useState("costas");

    const groups = ["costas", "bíceps", "tríceps", "ombros"];
    const exercises = [
        {
            id: "1",
            name: "Puxada frontal",
            image: Image1,
        },
        {
            id: "2",
            name: "Remada curvada",
            image: Image2,
        },
        {
            id: "3",
            name: "Remada unilateral",
            image: Image3,
        },
        {
            id: "4",
            name: "Levantamento terra",
            image: Image4,
        }
    ];


    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleOpenExerciseDetails() {
        navigation.navigate("exercise");
    };

    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected.toLocaleUpperCase() ===item.toUpperCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                my={10}
                maxH={10}
                minH={10}
            />
            <VStack flex={1} px={8}>
                <HStack justifyContent="space-between" mb={5}>
                    <Heading color="gray.200" fontSize="md" fontFamily="heading">
                        Exercícios
                    </Heading>
                    <Text color="gray.200" fontSize="sm">
                        { exercises.length }
                    </Text>
                </HStack>

                <FlatList
                    data={exercises}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ExerciseCard
                            name={item.name}
                            image={item.image}
                            onPress={handleOpenExerciseDetails}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: 8 }}
                />
            </VStack>
        </VStack>
    );
}
