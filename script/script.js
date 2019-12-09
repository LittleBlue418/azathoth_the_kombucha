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

      this.button_container = $("#button_container")

      this.load_chapter = this.load_chapter.bind(this)
      this.next_chapter = this.next_chapter.bind(this)
      this.previous_chapter = this.previous_chapter.bind(this)
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
      this.chapter = this.book[this.current_chapter]
    }

    next_chapter() {
      if (this.current_chapter < this.max_chapters) {
        this.current_chapter += 1;
        this.load_chapter(this.current_chapter)
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
    story.chapter_image.removeClass()
    story.chapter_image.addClass(story.chapter["image"])


    story.button_container.html(generate_navigation_buttons(story.current_chapter))
    console.log(story.button_container)
  }

  function generate_navigation_buttons(current_chapter) {
    if (current_chapter === 1) {
      return `<button onclick="('${story.next_chapter})">Next</button>`
    } else if (current_chapter > 1 && current_chapter < story.max_chapters) {
      return `<button onclick="('${story.next_chapter})">Next</button>
              <button onclick="('${story.previous_chapter})">Previous</button>`
    } else {
      return `<button onclick="('${story.previous_chapter})">Previous</button>`
    }
  }


  story.load_book()

})


