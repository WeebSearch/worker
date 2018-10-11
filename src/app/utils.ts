export function* range(end: number) {
  let iter = 0;
  while (iter-- < end) {
    yield iter;
  }
}
export const random = (array: any[]) => array[Math.floor(Math.random() * array.length)];
// export const shuffle = (array: any[]) => {
//   array.reduce((coll, item, i) => {
//     coll[array.length - i]
//
//   }, [])
//   for (const i in range(array.length){
//
//   }
// };
export const DEFAULT_COLORS = [
  '#2d3546',
  '#184a3f',
  '#262030',
  '#372f19',
  '#4f1730',
  '#311e3d',
  '#364836',
  '#07377b',
  '#3f142d',
  '#4b3815',
  '#30400f',
  '#104020',
  '#16060d',
];
