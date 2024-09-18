import * as React from 'react';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
const transactionsByMonthTemp = [
  { month: 'መስከ', totalAmount: 0, count: 10 },
  { month: 'ጥቅም', totalAmount: 0, count: 0 },
  { month: 'ህዳር', totalAmount: 0, count: 0 },
  { month: 'ታህሳ', totalAmount: 0, count: 0 },
  { month: 'ጥር', totalAmount: 0, count: 0 },
  { month: 'የካቲ', totalAmount: 0, count: 0 },
  { month: 'መጋቢ', totalAmount: 0, count: 0 },
  { month: 'ሚያዝ', totalAmount: 0, count: 0 },
  { month: 'ግንቦ', totalAmount: 0, count: 0 },
  { month: 'ሰኔ', totalAmount: 0, count: 0 },
  { month: 'ሐምሌ', totalAmount: 0, count: 0 },
  { month: 'ነሐሴ', totalAmount: 0, count: 0 },
  { month: 'ጳጉሜ', totalAmount: 0, count: 0 }
];




const valueFormatter = (value) => `${value} Birr`;

const chartSetting = {
  yAxis: [
    {
      label: 'Monthly payment  (Birr)',
    },
  ],
  series: [{ dataKey: 'totalAmount', label: ' ', valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function TickPlacementBars({data}) {
 

  return (
    <div style={{ width: '100%' }}>
     
      <BarChart
        dataset={data||transactionsByMonthTemp}
        xAxis={[
          { scaleType: 'band', dataKey: 'month' },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
