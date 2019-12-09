$(() => {

  class Story {
    constructor() {
      this.current_chapter = 0
      this.max_chapters = 0
      this.chapter = {}
      this.book = {}

      this.load_chapter = this.load_chapter.bind(this)
      this.next_chapter = this.next_chapter.bind(this)
      this.previous_chapter = this.previous_chapter.bind(this)
    }

    // Suggestion - re-write the completion function as
    // a promise call back
    load_book() {
      $.get("assets/story.json")
        .then((json) => {
            this.book = json
            this.max_chapters = this.book.length -1
          })
        .then(this.load_chapter)
    }


    load_chapter() {
      this.chapter = this.book[this.current_chapter]
      post_chapter()
    }

    next_chapter() {
      if (this.current_chapter < this.max_chapters) {
        this.current_chapter += 1;
        this.load_chapter()
      } else {
        console.log("last chapter!")
      }
    }

    previous_chapter() {
      if (this.current_chapter > 0) {
        this.current_chapter -= 1;
        this.load_chapter()
      } else {
        console.log("chapter 1!")
      }
    }
  }

  var story = new Story;

  const page_element = {
    chapter_title: $("#story_chapter"),
    chapter_text: $("#story_text"),
    chapter_image: $("#story_image"),

    next_button: $("#next_button"),
    previous_button: $("#previous_button"),
  }

  function post_chapter() {
    page_element.chapter_title.text(story.chapter["title"])
    page_element.chapter_text.text(story.chapter["text"])
    page_element.chapter_image.removeClass()
    page_element.chapter_image.addClass(story.chapter["image"])

    page_element.next_button.toggle(story.current_chapter < story.max_chapters)
    page_element.previous_button.toggle(story.current_chapter > 0)

  }


  page_element.next_button.click(() => {
    story.next_chapter()
  })

  page_element.previous_button.click(() => {
    story.previous_chapter()
  })



  story.load_book()

})


