const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const protoOptions = {
  keepCase: true,
  enums: String,
  longs: String,
  oneofs: true,
  default: true,
};
// note: MoveGenerator is the name of the service,
// move_generator is the name of the package
let packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "/move_generator.proto"),
  protoOptions
);
let moveGenDef = grpc.loadPackageDefinition(packageDefinition).move_generator;
// create a stub
let moveGen = new moveGenDef.MoveGenerator(
  "vsrstud02.informatik.tu-chemnitz.de:50051",
  grpc.credentials.createInsecure()
);

module.exports = moveGen;
