const bcrypt = require("bcrypt");

const hash = "$2b$10$3vPl4bpznEWhuxWcEMyq8.5GolKJZRs1aXhh5M5AY88ycRkVWzERi";

bcrypt.compare("admin123", hash).then(result => {
    console.log("Password Match:", result);
});