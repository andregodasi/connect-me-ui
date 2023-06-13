export enum Degree {
  UNDER_GRADUATE = 'UNDER_GRADUATE',
  GRADUATE = 'GRADUATE',
  MASTER = 'MASTER',
  DOCTOR = 'DOCTOR',
}

export const degreeArray = [
  { label: 'Ensino médio', value: 'UNDER_GRADUATE' },
  { label: 'Graduado', value: 'GRADUATE' },
  { label: 'Mestre', value: 'MASTER' },
  { label: 'Doutor', value: 'DOCTOR' },
];

export const degreeBeautifullName = {
  [Degree.UNDER_GRADUATE]: 'Ensino médio',
  [Degree.GRADUATE]: 'Graduado',
  [Degree.MASTER]: 'Mestre',
  [Degree.DOCTOR]: 'Doutor',
};
