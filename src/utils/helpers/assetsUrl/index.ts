import config from '../../../config/index';

const assetsUrl = (path?: string) => {
  if(path === undefined) {
    return '';
  }
  
  const assetsBaseUrl = config.assetsUrl.replace(/\/+$/, "");
  const url = path.replace(/^\/+/, '');
  
  return `${assetsBaseUrl}/${url}`;
}

export default assetsUrl;