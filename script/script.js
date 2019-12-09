$(() => {

  class Story {
    constructor() {
      this.current_chapter = 1
      this.max_chapters = 0
      this.chapter = {}
      this.book = {}

      this.chapter_title = $("#story_chapter")
      this.chapter_text = $("#story_text")
      this.chapter_image = $("#story_image")

      this.load_chapter = this.load_chapter.bind(this)
    }

    load_book() {
      $.get("assets/story.json", (json) => {
        this.book = json
        this.max_chapters = Object.keys(this.book).length
      })
      .then(this.load_chapter)
      .then(post_chapter)
    }

    load_chapter() {
      console.log(this)
      this.chapter = this.book[`${this.current_chapter}`]
    }

    next_chapter() {
      if (this.current_chapter < this.max_chapters) {
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


  function post_chapter() {

    story.chapter_title.text(story.chapter["title"])
    story.chapter_text.text(story.chapter["text"])
    story.chapter_image.text(story.chapter["image"])
    console.log(story.chapter)
    console.log(story.book)
  }


  story.load_book(story.current_chapter)
  console.log(story.chapter)
  console.log(story.book)

  //.then(post_chapter)

})


