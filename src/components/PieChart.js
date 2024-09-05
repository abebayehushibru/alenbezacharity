import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Stack from '@mui/material/Stack';
const colorPalette = [
  '#FF6384', // Red
  '#36A2EB', // Blue
  '#FFCE56', // Yellow
  '#4BC0C0', // Teal
  '#9966FF', // Purple
  '#FF9F40', // Orange
  '#FF7F7F', // Light Red
  '#7F7FFF', // Light Blue
  '#FFFF7F', // Light Yellow
  '#7FFFD4', // Aquamarine
  '#FF6347', // Tomato
  '#40E0D0', // Turquoise
  '#FF1493', // Deep Pink
  '#FFD700', // Gold
  '#ADFF2F', // Green Yellow
  '#8A2BE2', // Blue Violet
  '#FF4500', // Orange Red
  '#00CED1', // Dark Turquoise
  '#8B0000', // Dark Red
  '#006400', // Dark Green
  '#00BFFF', // Deep Sky Blue
  '#B22222', // Firebrick
  '#DAA520', // Golden Rod
  '#5F9EA0', // Cadet Blue
  '#D2691E', // Chocolate
  '#FF69B4', // Hot Pink
];




export default function OnSeriesItemClick({data}) {
  const items = data.map((payment, index) => {
    // Use index to cycle through the color palette
    const color = colorPalette[index % colorPalette.length];
    return {
      id: `id_${index}`, // Generate a unique id
      value: payment.value,
      label: `ባለ ${payment.amount}ብር`,
      color: color,
    };
  });
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" className="flex flex-col md:flex-row gap-3">
      <div className="flex flex-row justify-center items-center ">
        <PieChart
          series={[
            {
              data: items,
              innerRadius: 0, // Example customization
              outerRadius: 80, // Example customization
            },
          ]}
          width={400}
          height={200}
        className='ml-[100px] overflow-hidden'
        />
      </div>
      <div className="flex  flex-wrap  items-start px-[5%] justify-between ">
        {items.map((item, index) => (
          <div key={index} className="flex items-center w-[40%] gap-1 text-gray-700  ">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
            <span className='font-bold'>{item.label}</span>
          </div>
        ))}
      </div>
    </Stack>
  );
}
