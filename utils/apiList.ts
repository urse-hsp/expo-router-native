export type dataType<T> = Record<string, T>;
export type methodType = 'POST' | 'GET' | 'DELETE';

export interface urlProps {
  url: string;
  method: methodType;
}

const data: dataType<urlProps> = {
  /**
 *  @demo (demo)
 */
  demo: {
    url: 'http://t.weather.sojson.com/api/weather/city/101030100',
    method: 'GET',
  },

}
export default data