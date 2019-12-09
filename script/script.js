$(() => {

class Story {
  constructor() {
    this.current_chapter = 1
    this.chapter_title = $("#story_chapter")
    this.chapter_text = $("#story_text")
    this.chapter_image = $("#story_image")
  }


  next_chapter() {
    if (this.current_chapter < max_chapters) {
      this.current_chapter += 1;
      load_chapter(this.current_chapter)
    } else {
      console.log("last chapter!")
    }
  }

  previous_chapter() {
    if (this.current_chapter > 1) {
      this.current_chapter -= 1;
      load_chapter(this.current_chapter)
    } else {
      console.log("chapter 1!")
    }
  }
}

var story = new Story;


// Global variables
var max_chapters;
var chapter = "x";
var book = "y";



function load_chapter() {

    story.chapter_title.text(chapter["title"])
    story.chapter_text.text(chapter["text"])
    story.chapter_image.text(chapter["image"])
    console.log(chapter)
    console.log(book)
  }


function get_chapter(current_chapter) {
  $.get("assets/story.json", (json) => {
    book = json
    chapter = json[`${current_chapter}`]
    console.log(chapter)
    max_chapters = Object.keys(book).length
    return chapter
  })
    .then(load_chapter())
}




  get_chapter(3)
})


