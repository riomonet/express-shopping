process.env.NODE_ENV = "test"

const request = require("supertest")
const app = require("./app")
let db = require("./fakeDb")


beforeEach(() => {
    db.items.push({name: "cheerios", price: 3.75})
});

afterEach(()=> {
    db.items.length = 0;
});


describe("Get /items", () => {

    test("Get all Items" , async () => {
	const res = await request(app).get("/items")
	expect(res.statusCode).toBe(200)
	expect(res.body).toEqual({items: [{name: "cheerios" , price : 3.75}]})
    })
});

describe("Post /items", () => {
    test("post item", async () => {
	const res = await request(app).post("/items").send({ name: "fluffies", price : 2.24});
	expect(res.statusCode).toBe(200);
	expect(res.body).toEqual({ added: { name: "fluffies", price: 2.24 }});
    });
});

describe("Patch /items/:name", ()=> {
    test("updating an item", async ()=>{

	const res = await request(app).patch("/items/cheerios").send({name: "chee--re-os"});
	expect(res.statusCode).toBe(200)
	expect(res.body).toEqual({ updated: { name: "chee--re-os" } });
    });
    test("responds with 404 for invalid name", async () => {
	const res = await request(app).patch("/items/noname")
	expect(res.statusCode).toBe(500)
    })
});

describe("Delete /items/:name", ()=> {
    test("deleting  an item", async ()=> {
	const res = await request(app).delete("/items/cheerios")
	expect(res.body).toEqual({ deleted: { name: 'cheerios'}})
	expect(res.statusCode).toBe(200)
    });
});



     //getting all items
    //getting a single item
    //what if it is not found
    //deleting an item 
    //what is it is not ofund
