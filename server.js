const app = require ('./app');

const express = require ('express');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`covid ~ Server started on port ${PORT}`);
});