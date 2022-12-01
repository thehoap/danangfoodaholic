import {
    type ChartData,
    type ChartOptions,
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import React from 'react';
import { StyledRadar } from './styles';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface IRadarChart {
    stats: number[];
}

const RadarChart = ({ stats }: IRadarChart) => {
    const data: ChartData<'radar'> = {
        labels: ['Space', 'Food', 'Hygiene', 'Service', 'Price'],
        datasets: [
            {
                label: 'Rate',
                data: stats.includes(NaN) ? Array(5).fill(0) : stats,
                backgroundColor: 'rgba(234, 106, 18, 0.3)',
                borderColor: 'rgba(234, 106, 18, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'radar'> = {
        font: {
            family: 'Inter, sans-serif',
            weight: 'bold',
        },
        maintainAspectRatio: true,
        responsive: true,
        scales: {
            r: {
                min: 0,
                max: 5,
                beginAtZero: true,
            },
        },
    };

    return <StyledRadar data={data} options={options} />;
};

export default React.memo(RadarChart);
