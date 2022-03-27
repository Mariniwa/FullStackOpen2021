export const bmiCalculator = (a: number, b: number): string => {
  const height = a / 100;
  const weight = b;
  const result = weight / Math.pow(height, 2);
  if (result < 18.5) {
    console.log('Underweight');
    return 'Underweight';
  }
  if (result >= 18.5 && result <= 24.9) {
    console.log('Normal (healthy weight)');
    return 'Normal (healthy weight)';
  }
  if (result >= 25.0 && result <= 29.9) {
    console.log('Overweight');
    return 'Overweight';
  }
  if (result >= 30) {
    console.log('Obese');
    return 'Obese';
  }
  return 'Insert the right parameters';
};

const a = Number(process.argv[2]);
const second = Number(process.argv[3]);
bmiCalculator(a, second);
