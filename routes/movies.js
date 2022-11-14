import Movie from '../models/Movie.js';
import cloudinary from '../utils/cloudinary.js';
import { storage, SUpload } from '../utils/cloud.js';
import verify from '../verifyToken.js'
import express from 'express'
import Content from '../models/Content.js';
const router = express.Router();



//CREATE A MOVIE

router.post('/',
//  SUpload.array('image'), 
 SUpload.fields([{
    name: 'image', maxCount: 1
  }, {
    name: 'thumbnail', maxCount: 1
  }, {
    name: 'trailer', maxCount: 1
  }]),
 async (req, res) => {

    

    console.log(req.body, 'the list of requests')

    const { 
        title, 
        description, 
        year, 
        ageLimit,
        duration,
        director,
        genre,
        isSeries,
        content
     } = req.body;

    // if (req.user.isAdmin) {
            try {
                if (!req.files){
                    // console.log(req.file, 'files');
                    const error = new Error('No File')
                    console.log(error)
                    return res.status(400).json({message: "We need a file"});
                }
                let newMovie = await Movie.create({
                    title,
                    description, 
                    year, 
                    ageLimit,
                    duration,
                    director,
                    genre,
                    isSeries,
                    content
                });

                    newMovie.content = content
                
                console.log(content, '$$$$$$$$$$£££££££££££&&&&&&&&&')
                if (req.files) { // if you are adding multiple files at a go
                    const image = []; // array to hold the image urls
                    const files = req.files.image; // array of images
                    for (const file of files) {
                        const { path, filename } = file;
                        image.push({
                            image: path,
                            public_id: filename
                        });
                    };
                    

                    const thumbnail = []; // array to hold the thumbnail urls // array of thumbnails
                    const pic = req.files.thumbnail
                    // console.log(pic)
                    for (const file of pic) {
                        const { path, filename } = file;
                        thumbnail.push({
                            thumbnail: path,
                            public_id: filename
                        });
                    };

                    
                    const trailer = []; // array to hold the thumbnail urls // array of thumbnails
                    const tra = req.files.trailer
                    for (const file of tra) {
                        const { path, filename } = file;
                        trailer.push({
                            trailer: path,
                            public_id: filename
                        });
                    };
        
                    newMovie.image = image; // add the urls to object
                    newMovie.thumbnail = thumbnail
                    newMovie.trailer = trailer
                }
                    
                    const savedMovie = await newMovie.save();
                    return res.status(201).json({ savedMovie });
            } catch (err) {
                console.log(err, '$$$$$$$');
                return res.status(400).json({message: "cloudinary error", error: err})
            }
        // } else {
        //     res.status(500).json({message: "Server Error"})
        // }
});

//UPDATE A MOVIE

router.put('/:id',
//  SUpload.array('image'), 
 SUpload.fields([{
    name: 'image', maxCount: 1
  }, {
    name: 'thumbnail', maxCount: 1
  }, {
    name: 'trailer', maxCount: 1
  }]),
 async (req, res) => {


    const { 
        title, 
        description, 
        year, 
        ageLimit,
        duration,
        director,
        genre,
        isSeries,
        content
     } = req.body;
    // if you are the admin
    //  if (req.user.isAdmin) {
         try {
             // fetch the movie you want to update
             let updatedMovie = await Movie.findById(req.params.id)

            if (req.files) {
                await cloudinary.api.delete_resources([updatedMovie.image[0].public_id, updatedMovie.thumbnail[0].public_id],
                    function (err, result) {console.log(result, err, 'image')
                   })
                 
                await cloudinary.api.delete_resources([updatedMovie.trailer[0].public_id], {
                    resource_type: 'video'
                },
                    function (err, result) {console.log(result, err, 'trailer')
                   })


                   const image = []; // array to hold the image urls
                const files = req.files.image; // array of images
                for (const file of files) {
                    const { path, filename } = file;
                    image.push({
                        image: path,
                        public_id: filename
                    });
                };


                    const thumbnail = []; // array to hold the thumbnail urls // array of thumbnails
                    const pic = req.files.thumbnail
                    for (const file of pic) {
                        const { path, filename } = file;
                        thumbnail.push({
                            thumbnail: path,
                            public_id: filename
                        });
                    };


                    const trailer = []; // array to hold the thumbnail urls // array of thumbnails
                    const tra = req.files.trailer
                    for (const file of tra) {
                        const { path, filename } = file;
                        trailer.push({
                            trailer: path,
                            public_id: filename
                        });
                    };

                    updatedMovie.image = image
                    updatedMovie.thumbnail = thumbnail
                    updatedMovie.trailer = trailer
             

             const data = {
                title: title || updatedMovie.title,
                description: description || updatedMovie.description,
                year: year || updatedMovie.year,
                ageLimit: ageLimit || updatedMovie.ageLimit,
                description: description || updatedMovie.description,
                duration: duration || updatedMovie.duration,
                director: director || updatedMovie.director,
                genre: genre || updatedMovie.genre,
                isSeries: isSeries || updatedMovie.isSeries,
                content: content || updatedMovie.content,
                trailer: trailer || updatedMovie.trailer,
                image: image || updatedMovie.image,
                thumbnail: thumbnail || updatedMovie.thumbnail
                // public_id: result.public_id || updatedMovie.public_id
             }

                // UPDATE FIRST
               updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
                   $set: data,
                },
                //RETURN NEW USER
                {
                    new: true
                });
                console.log(updatedMovie)
                console.log(updatedMovie.trailer)
             return res.status(200).json({result: updatedMovie});
            } else {
                try {
                    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,
        
                        // UPDATE FIRST
                        {$set: req.body},
                        
                        //RETURN NEW USER
                        {new: true});
                        return res.status(200).json(updatedMovie)
                } catch (err) {
                    console.log(err.message)
                }
            }
         } catch (err) {
             res.status(500).json({message: err})
         }
    //  } else {
    //      res.status(403).json(`Only admin can make changes`)
    //  }
})



//DELETE A MOVIE

router.delete('/:id', async (req, res) => {
    // if you are the admin
    // if (req.user.isAdmin) {
        //fetch the movie using the movie id and delete the user.
        try {
            let movie = await Movie.findById(req.params.id);
            if(movie.image){
                await cloudinary.api.delete_resources([movie.image[0].public_id],
                    function (err, result) {console.log(result, err, 'mad thing')
                   })
            } else if (movie.thumbnail){
                await cloudinary.api.delete_resources([movie.thumbnail[0].public_id],
                    function (err, result) {console.log(result, err, 'mad thing')
                   })
            } else if (movie.trailer){
                await cloudinary.api.delete_resources([movie.trailer[0].public_id], {
                    resource_type: 'video'
                },
                    function (err, result) {console.log(result, err, 'trailer')
                   })
            } else {
                return movie
            }
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json({message: `The Movie with id ${req.params.id} has been deleted.`, deleted: movie});
        } catch (err) {
            res.status(500).json(err)
        }
    // } else {
    //     //if the Content id is not the same as the one requested,
    //     //then return this response 'You can only delete your account' 
    //     res.status(403).json(`Only admin can make changes`)
    // }
})



//GET A MOVIE

router.get('/find/:id', async (req, res) => {
    //fetch the movie using the movie id.
        try {
            const movie = await Movie.findById(req.params.id)
            .populate({
                path: 'content',
                select: 'title videoHD description ageLimit duration'
            });

            
            //return the movie 
            res.status(200).json(movie);
        } catch (err) {
            //catch any errors.
           return res.status(500).json(err)
        }
})

//GET A RANDOM MOVIE

router.get('/random', async (req, res) => {
    const type = req.query.type
    let movie;
    try {
        if (type === 'series'){
            movie = await Movie.aggregate([
                {$match: {isSeries: true} },
                {$sample: {size: 1} },
            ]);
        } else {
            movie = await Movie.aggregate([
                {$match: {isSeries: false} },
                {$sample: {size: 1} },
            ]);
        }
        res.status(200).json(movie)
    } catch (err) {
        res.status(500).json(err)
    }
})


// GET RANDOM MOVIES --- FEATURED

router.get('/featured', async (req, res) => {
    // name the query "type"
    let movie;
        try {
                // fetch random one
                movie = await Movie.aggregate([
                    {
                        $sample: { size: 10 }
                    }
                ]);
            res.status(200).json(movie)
        } catch (err) {
            res.status(500).json(err)
        }
})


//GET USER STATS

router.get('/stats', async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear - 1)

    const monthsArray = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
})


//GET ALL MOVIES



router.get('/', async (req, res) => {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse())
        } catch (err) {
            res.status(500).json(err.message)
        }
})


export default router