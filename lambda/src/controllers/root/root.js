import rootHtml from '../../rootHtml.js';

const root = (_, res) => {
  res.type('html').send(rootHtml);
};

export default root;
