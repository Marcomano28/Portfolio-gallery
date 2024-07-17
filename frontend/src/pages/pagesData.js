import p5SketchForest from "../JsSketchs/Forest";
import p5SketchHanuman from "../JsSketchs/Hanuman";
import p5SketchHome from '../JsSketchs/Room'
import p5SketchTeacher from '../JsSketchs/Teacher';
import p5SketchCurtain from '../JsSketchs/TextCurtain'
// import miImagen from '../assets/images/miImagen.jpg';
// import miImagen1 from '../assets/images/miImagen1.jpg';
// import miImagen4 from '../assets/images/miImagen4.jpg';
// import miImagen5 from '../assets/images/miImagen5.jpg';
// import miImagenMan from '../assets/images/miImagenMan.jpg';

const baseUrl = import.meta.env.VITE_API_URL;

const pagesData = [
    {
      path: "/bycode",
      windows: [
        {
          id: "window1",
          showNav: true,
          headText:'Step into a Digital Memory Lane: Explore this video album of dreamscapes crafted in Processing.',
          videoComponent: "StandardVideo",
          videoData: { src:'/media/caracol dream.mp4', title:'DREAM-COLORS', title1:'HOME',
                       title2:'DEEP', title3:'Spiral', title4:'Dream-deepness',},
          slidesData: [{ icon: '1', title: 'Dreams', content: '...are not what you see in sleep,' },
                       { icon: '2', title: 'Dreams', content: 'it is the thing which doesn\'t let you sleep' }, 
                       ]
        },
        {
          id: "window2",
          showNav: false,
          videoComponent: "StandardVideo",
          videoData: {src:'/media/space-Tunel.mp4', title:'HOLE', title1:'SPEED',
                      title2:'SPACE', title3:'Door', title4:'Night', },
          slidesData: [{ icon: '1', title: `NIGHT'S`, content: '"Lines of code weave silent dreams,' },
                       { icon: '2', title: 'CANVAS', content: `..Night's quiet whisper"` }, 
                       ]
        },
        {
          id: "window3",
          showNav: false,
          videoComponent: "StandardVideo",
          videoData: {src:'/media/catarata.mp4', title:'WATER', title1:'DREAM', title2:'RUN',
                      title3:'Night', title4:'Space-deepness', },
          slidesData: [{ icon: '1', title: 'AMADO', content: `"Self abandoned, self forgot,` },
                       { icon: '2', title: '', content: `all ceased, and I was not,` },
                       { icon: '3', title: '', content: `there among the lilies all forgotten"` },
                      ]
        },
        {
          id: "window4",
          showNav: false,
          videoComponent: "StandardVideo",
          videoData: {src:'/media/cub.mp4', title:'MANGER', title1:'SPONGE',
                      title2:'CUBOX', title3:'Fractal', title4:'Iterate-deepness', },
          slidesData: [{ icon: '1', title: 'PORTRET', content: `"I arose and went,` },
                       { icon: '2', title: '', content: `..as no one knows,` },
                       { icon: '3', title: '', content: `when all my house lay long in deep repose` },
                      ]
        },
      ]
    },
       
    {
        path: "/points3D",
        windows: [
          {
            id: "window1",
            showNav: true,
            headText:`"Is it not so..., that points of light suspended in the dark void evoke an ancient awe within us? Like static memories, recollections frozen in eternity..."`,
            videoComponent: "StandardVideo",
            videoData: {src:'/media/casachicacorto.mp4', title:'NIGHT', title1:'IZBA',
                        title2:'STEPS', title3:'Dark', title4:'Dream-deepness',},
            slidesData: [{ icon: '1', title: 'HUMAN', content: '"I have a feeling that inside you somewhere,' },
                         { icon: '2', title: 'PORTRET', content: `...there's somebody nobody knows about"` },
                        ]
          },
          {
            id: "window2",
            showNav: false,
            videoComponent: "StandardVideo",
            videoData: {src:'/media/Crz.mp4', title:'ASCENCION', title1:'RUTT-ETRA',
                        title2:'PAIN', title3:'Acceptance', title4:'deepness',},
            slidesData: [{ icon: '1', title: `PORTRET`, content: `"If I won't be myself, who will?` },
                         { icon: '2', title: 'CANVAS', content: `However vast the darkness, we must supply our own light."` },
                        ]
          },
          {
            id: "window3",
            showNav: false,
            videoComponent: "StandardVideo",
            videoData: {src:'/media/samicorto.mp4', title:'ROOM', title1:'INFINITE',
                        title2:'TIME', title3:'Door', title4:'Flying eye',},
            slidesData: [{ icon: '1', title: 'NEVER END', content: `"Either you care, or you don't. There's no in-between.` },
                         { icon: '2', title: '', content: `And if you care, then go all of the way.` },
                         { icon: '3', title: '', content: `The test of a work of art is, in the end, our affection for it` },
                        ]
          },
          {
            id: "window4",
            showNav: false,
            videoComponent: "StandardVideo",
            videoData: {src:'/media/flores.mp4', title:'LONELINESS', title1:'SUSPENCE',
                        title2:'SPIRAL', title3:'Breathing', title4:'Hole-dream',},
            slidesData: [{ icon: '1', title: 'TIME', content: `"..the substance I am made of,` },
                         { icon: '2', title: 'RIVER', content: `..which sweeps me along, but I am the river` },
                         { icon: '3', title: 'FIRE', content: `that consumes me, but I am the fire."` },
                        ]
          },
        ]
      },
      {
        path: "/interact",
        windows: [
          {
            id: "window1",
            showNav: true,
            headText: `Dreamscapes of Light and Shadow: Each sketch comes alive in its own way,...discover how sketch uniquely interacts. Capture snapshots of your journey—'s' is the key. Daydreams and night visions`,
            videoComponent: "InteractiveSketch",
            videoData: {
              src: `${baseUrl}/imageurl/ima0`,
              buttonId: "start-button1",
              canvasId: "myCanvas-container0",
              onStart: () => console.log("Button Clicked"),
              scriptSrc: p5SketchForest,
            },
        slidesData: [{ icon: '1', title: `Silence`, content: `To imagine a language is to imagine a form of life` },
                     { icon: '2', title: 'Digit', content: `Explanations come to an end somewhere` },
                    ]
           }, 
           {
            id: "window2",
            showNav: false,
            videoComponent: "InteractiveSketch",
            videoData: {
              src: `${baseUrl}/imageurl/ima1`,
              buttonId: "start-button2",
              canvasId: "myCanvas-container1",
              onStart: () => console.log("Button Clicked"),
              scriptSrc: p5SketchCurtain,
            },
        slidesData: [{ icon: '1', title: `Designers`, content: `"...all squint when they look at something.` },
                     { icon: '2', title: '', content: `They squint to see the forest from the trees - to find the right balance."` },
                     { icon: '3', title: 'Squint at the world...', content: `You will see more, by seeing less."` },
                    ]
           }, 
           {
            id: "window3",
            showNav: false,
            videoComponent: "InteractiveSketch",
            videoData: {
              src: `${baseUrl}/imageurl/ima2`,
              buttonId: "start-button3",
              canvasId: "myCanvas-container2",
              onStart: () => console.log("Button Clicked"),
              scriptSrc: p5SketchHome,
            },
        slidesData: [{ icon: '1', title: `The language`, content: `"Trapped within the confines of language... who dares to step out? ` },
                     { icon: '2', title: 'Digital', content: `The door is wide open.` },
                    ]
           },
           {
            id: "window4",
            showNav: false,
            videoComponent: "InteractiveSketch",
            videoData: {
              src: `${baseUrl}/imageurl/ima3`,
              buttonId: "start-button4",
              canvasId: "myCanvas-container3",
              onStart: () => console.log("Button Clicked"),
              scriptSrc: p5SketchHanuman,
            },
        slidesData: [{ icon: '1', title: `Escape`, content: `"...force required by a mass to break free from gravity` },
                     { icon: '2', title: 'velocity', content: `Coding, as a logical abstraction, is like a spacecraft that shields us outside the gravitational pull of human language.` },
                     { icon: '3', title: '', content: `Design is thinking made visual.` },
                    ]
           },
           {
            id: "window5",
            showNav: false,
            videoComponent: "InteractiveSketch",
            videoData: {
              src: `${baseUrl}/imageurl/ima4`,
              buttonId: "start-button5",
              canvasId: "myCanvas-container4",
              onStart: () => console.log("Button Clicked"),
              scriptSrc: p5SketchTeacher,
            },
        slidesData: [{ icon: '1', title: `Coding`, content: `"In the realm of human understanding, coding to language is what stepping out of Earth's orbit is to space exploration."` },
                     { icon: '2', title: 'Digital', content: `` },
                    ]
           },         
        ]
      },

  ];
  
  export default pagesData;