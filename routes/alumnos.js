const { Router } = require('express');
const router = Router();

const Alumno = require('../models/Alumno');

router.get('/', async (req,res) =>{
    //Ordenando datos sort: 1-Asc.  -1:Desc
    const alumnos = await Alumno.find().sort('-_id');
    res.json(alumnos);
});


router.post('/', async (req, res) => {
    const { nombre, apellidos, edad } = req.body;
    const newAlumno = new Alumno({nombre, apellidos, edad});
    console.log(newAlumno)
    await newAlumno.save();
    res.json({'message': 'Alumno registrado'});
});

router.put('/:id',async (req,res) => {
   const { nombre, apellidos, edad } = req.body;
   const id = req.params.id;


 await Alumno.findByIdAndUpdate(id,{$set:req.body}, (err, result)=>{
        if(err){
            console.log(err);
        }   
        res.json({'message':result});
    });


}); 


router.delete('/:id', async (req, res) => {
    const alumno = await Alumno.findByIdAndDelete(req.params.id);
    res.json({message: 'Alumno eliminado'});
});



module.exports = router;