export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  TYPE: process.env.TYPE as any,
  HOST: process.env.HOST,
  PORT: parseInt(process.env.PORT, 10),
  USERNAME: process.env.USERDB,
  PASSWORD: process.env.PWDDB,
  DATABASE: process.env.DB,
});
