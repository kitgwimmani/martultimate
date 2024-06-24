const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const mysql = require("mysql")
const app = express();

app.use(express.json())
app.use(cors());
app.use(fileUpload());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mart_ultimate"
}) 
// business, Business, Business
app.get("/business", (req, res) => {
    const sql = "SELECT * from business";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
});

app.get("/business_frontend", (req, res) => {
    const sql = "SELECT * from business where status = 1";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
});
app.get("/getBusiness/:id", (req, res) => {
    const sql = "SELECT * FROM business WHERE id = ?  LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

//############## Image upload
//################
// Set up storage engine with multer

//############## Image upload
//################
app.post('/createBusiness', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "profileImage") is used to retrieve the uploaded file
    let profileImage = req.files.profileImage;
    
    // Extract the file extension
    let fileExtension = profileImage.name.split('.').pop();
    
    // Set the new filename to req.body.name with the original file extension
    let filename = `${req.body.name}.${fileExtension}`;
    
    // Set the upload path
    let uploadPath = __dirname + '/uploads/' + filename;

    // Use the mv() method to place the file somewhere on your server
    profileImage.mv(uploadPath, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        // Insert form data and file path into the database
        const sql = "INSERT INTO business (`name`, `location`, `slogan`, `year_established`, `phone`, `email`, `web_url`, `logo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
            req.body.name, 
            req.body.location,
            req.body.slogan,
            req.body.year_established,
            req.body.phone,
            req.body.email,
            req.body.web_url,
            filename // Save the new filename in the database
        ];

        db.query(sql, values, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error inserting data", error: err });
            }
            return res.status(201).json({ message: "Business created successfully", data: data, imageUrl: `/uploads/${filename}` });
        });
    });
});


//serve static files
app.use('/uploads', express.static(__dirname + '/uploads'));



app.put('/updateBusiness/:id', (req, res) => {
    const sql = "UPDATE business set `name` = ?, `location` = ?, `profile` = ?, `year_established` = ?, `phone` = ?, `email` = ?, `web_url` = ? where id = ?";
    const values = [
        req.body.name, 
        req.body.location,
        req.body.profile,
        req.body.year_established,
        req.body.phone,
        req.body.email,
        req.body.web_url
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/activateBusiness/:id', (req, res) => {
    const sql = "UPDATE business set `status` = 1 where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/declineBusiness/:id', (req, res) => {
    const sql = "UPDATE business set `status` = 2 where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/pendingBusiness/:id', (req, res) => {
    const sql = "UPDATE business set `status` = 0 where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})


app.delete('/business/:id', (req, res) => {
    const sql = "DELETE FROM business where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Category Category Category
app.get("/category", (req, res) => {
    const sql = "SELECT * from category ORDER BY name ASC";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/getCategory/:id", (req, res) => {
    const sql = "SELECT * FROM category WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.post('/createCategory', (req, res) => {
    const sql = "INSERT INTO category (`name`,`description`) VALUES (?)";
    const values = [
        req.body.name, 
        req.body.description
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/updateCategory/:id', (req, res) => {
    const sql = "UPDATE category set `name` = ?, `description` = ? where id = ?";
    const values = [
        req.body.name, 
        req.body.description
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/category/:id', (req, res) => {
    const sql = "DELETE FROM category where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//##################################################################33

//SubCategory SubCategory SubCategory
app.get("/subcategory", (req, res) => {
    const sql = "SELECT * from subcategory ORDER BY name ASC";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/getSubcategory/:id", (req, res) => {
    const sql = "SELECT * FROM subcategory WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.post('/createSubcategory', (req, res) => {
    const sql = "INSERT INTO subcategory (`category`,`name`,`description`) VALUES (?)";
    const values = [
        req.body.category,
        req.body.name, 
        req.body.description
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/updateSubcategory/:id', (req, res) => {
    const sql = "UPDATE subcategory set `category` = ?, `name` = ?,  `description` = ? where id = ?";
    const values = [
        req.body.category, 
        req.body.name, 
        req.body.description
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/subcategory/:id', (req, res) => {
    const sql = "DELETE FROM subcategory where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//##################################################################33
//Location Location Location Location
app.get("/location", (req, res) => {
    const sql = "SELECT * from location ORDER BY name ASC";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/getLocation/:id", (req, res) => {
    const sql = "SELECT * FROM location WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.post('/createLocation', (req, res) => {
    const sql = "INSERT INTO location (`name`) VALUES (?)";
    const values = [
        req.body.name
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/updateLocation/:id', (req, res) => {
    const sql = "UPDATE location set  `name` = ? where id = ?";
    const values = [
        req.body.name
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/location/:id', (req, res) => {
    const sql = "DELETE FROM location where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//###############################################################

//Customer Customer Customer Customer
app.get("/customer", (req, res) => {
    const sql = "SELECT * from customer ORDER BY name ASC";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/getCustomer/:id", (req, res) => {
    const sql = "SELECT * FROM customer WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.post('/createCustomer', (req, res) => {
    const sql = "INSERT INTO customer (`name`,`email`,`phone`,`location`,`gender`,`age`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.location,
        req.body.gender,
        req.body.age
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/updateCustomer/:id', (req, res) => {
    const sql = "UPDATE customer set  `name` = ?, `email` = ?, `phone` = ?, `location` = ?, `gender` = ?, `age` = ?  where id = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.location,
        req.body.gender,
        req.body.age
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/activateCustomer/:id', (req, res) => {
    const sql = "UPDATE customer set `status` = 1 where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/declineCustomer/:id', (req, res) => {
    const sql = "UPDATE customer set `status` = 2 where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/pendingCustomer/:id', (req, res) => {
    const sql = "UPDATE customer set `status` = 0 where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/customer/:id', (req, res) => {
    const sql = "DELETE FROM customer where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//###############################################################
//Customer Customer Customer Customer
app.get("/product_type", (req, res) => {
    const sql = "SELECT * from product_type ORDER BY name ASC";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Product Product Product Product
app.get("/product", (req, res) => {
    const sql = "SELECT * from product ORDER BY name ASC";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//###########################################################
app.get("/product_detail", (req, res) => {
    const sql = "SELECT * from product_detail ORDER BY category ASC";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/product_detail/:id", (req, res) => {
    const sql = "SELECT * from product_detail WHERE business_id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
})
//###########################################################

app.get("/getProduct/:id", (req, res) => {
    const sql = "SELECT * FROM product WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.post('/createProduct', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "profileImage") is used to retrieve the uploaded file
    let profileImage = req.files.profileImage;
    
    // Extract the file extension
    let fileExtension = profileImage.name.split('.').pop();
    
    // Set the new filename to req.body.name with the original file extension
    let filename = `${req.body.name}.${fileExtension}`;
    
    // Set the upload path
    let uploadPath = __dirname + '/uploads/' + filename;

    // Use the mv() method to place the file somewhere on your server
    profileImage.mv(uploadPath, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

    const sql = "INSERT INTO product (`subcategory`,`name`,`description`,`business`,`price`,`product_type`,`image`) VALUES (?,?,?,?,?,?,?)";
    const values = [
        req.body.subcategory,
        req.body.name,
        req.body.description,
        req.body.business,
        req.body.price,
        req.body.product_type,
        filename
    ]
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error inserting data", error: err });
        }
        return res.status(201).json({ message: "Product created successfully", data: data, imageUrl: `/uploads/${filename}` });
    });
});
})

app.put('/updateProduct/:id', (req, res) => {
    const sql = "UPDATE product set  `subcategory` = ?, `name` = ?, `description` = ?, `business` = ?, `price` = ?, `product_type` = ?  where id = ?";
    const values = [
        req.body.subcategory,
        req.body.name,
        req.body.description,
        req.body.business,
        req.body.price,
        req.body.product_type
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/activateProduct/:id', (req, res) => {
    const sql = "UPDATE product set `status` = 1 where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/declineProduct/:id', (req, res) => {
    const sql = "UPDATE product set `status` = 2 where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/pendingProduct/:id', (req, res) => {
    const sql = "UPDATE product set `status` = 0 where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/product/:id', (req, res) => {
    const sql = "DELETE FROM product where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("listening")
})