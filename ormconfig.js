module.exports = {
  type: "oracle",
  host: "localhost",
  port: 1521,
  username: "developer",
  password: "Salsa123",
  database: "XEPDB1",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: true
};
