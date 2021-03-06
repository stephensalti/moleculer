const { BrokerOptionsError } = require("../../../src/errors");
const Serializers = require("../../../src/serializers");

describe("Test Serializers resolver", () => {

	it("should resolve null from undefined", () => {
		let serializer = Serializers.resolve();
		expect(serializer).toBeInstanceOf(Serializers.JSON);
	});

	it("should resolve JSONSerializer from obj without type", () => {
		let serializer = Serializers.resolve({});
		expect(serializer).toBeInstanceOf(Serializers.JSON);
	});

	it("should resolve JSONSerializer from obj", () => {
		let serializer = Serializers.resolve({ type: "JSON" });
		expect(serializer).toBeInstanceOf(Serializers.JSON);
	});

	it("should resolve AvroSerializer from string with Avro type", () => {
		let serializer = Serializers.resolve("avro");
		expect(serializer).toBeInstanceOf(Serializers.Avro);
	});

	it("should throw error if type if not correct", () => {
		expect(() => {
			Serializers.resolve("xyz");
		}).toThrowError(BrokerOptionsError);

		expect(() => {
			Serializers.resolve({ type: "xyz" });
		}).toThrowError(BrokerOptionsError);
	});

});
