const getKey = () => {
  axios.get("https://project-1-api.herokuapp.com/register").then((res) => {
    console.log(res);
  });
};

const myKey2 = "?api_key=a6ece6ac-e3b8-4849-a699-f9497aa4991e";
const myKey = "?api_key=226c5472-44d6-4e27-afb5-4070724aba91";

const container = document.querySelector(".comments__container");

let commentArray = [];

const getComments = () => {
  container.innerHTML = "";
  axios
    .get("https://project-1-api.herokuapp.com/comments" + myKey2)
    .then((response) => {
      let param = response.data;
      param.forEach((element) => {
        commentArray.push(element);
        parseComments(element);
      });
    });
};
getComments();

const parseComments = (param) => {
  let commentsUnit = document.createElement("div");
  commentsUnit.className = "comments__unit";

  let picWrapper = document.createElement("div");
  picWrapper.className = "comments__pic-wrapper";
  commentsUnit.appendChild(picWrapper);

  let pic = document.createElement("img");
  pic.className = "comments__pic";
  picWrapper.appendChild(pic);

  let block = document.createElement("div");
  block.className = "comments__block";
  commentsUnit.appendChild(block);

  let bio = document.createElement("div");
  bio.className = "comments__bio";
  block.appendChild(bio);

  let name = document.createElement("h3");
  name.className = "comments__name";
  name.innerText = param.name;
  bio.appendChild(name);

  let date = new Date(param.timestamp).toDateString();
  let dateUnit = document.createElement("h3");
  dateUnit.className = "comments__date";
  dateUnit.innerHTML = `${date}`;
  bio.appendChild(dateUnit);

  let comment = document.createElement("p");
  comment.className = "comments__comment";
  comment.innerText = `${param.comment}`;
  block.appendChild(comment);

  let commentHandles = document.createElement("div");
  commentHandles.className = "comments__handles";
  block.appendChild(commentHandles);

  let del = document.createElement("button");
  del.className = "comments__delete";
  del.setAttribute("value", `${param.id}`);
  del.innerText = "Remove";
  commentHandles.appendChild(del);

  let like = document.createElement("button");
  like.className = "comments__like  fa fa-thumbs-up";
  like.setAttribute("value", param.id);
  commentHandles.appendChild(like);

  let likes = document.createElement("p");
  likes.className = "comments__counter";
  likes.innerText = `${param.likes}`;
  commentHandles.appendChild(likes);

  container.prepend(commentsUnit);

  const delComment = document.querySelector(".comments__delete");
  delComment.addEventListener("click", (e) => {
    confirmDel(e);
  });

  const likeComment = document.querySelector(".comments__like");
  likeComment.addEventListener("click", (e) => {
    axios
      .put(
        `https://project-1-api.herokuapp.com/comments/${e.target.value}/like${myKey2}`
      )
      .then((res) => {
        getComments();
      });
  });
};

const form = document.querySelector(".form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let fName = document.querySelector(".form__name").value;
  let fComm = document.querySelector(".form__comment").value;

  if (fName && fComm) {
    axios
      .post("https://project-1-api.herokuapp.com/comments" + myKey2, {
        name: `${fName}`,
        comment: `${fComm}`,
      })
      .then((response) => {
        form.reset();
        parseComments(response.data);
      });
  } else {
    alert("Please fill the form before submitting!");
  }
});

const confirmDel = (e) => {
  let res = confirm("Are you sure you want to delete this comment?");
  if (res == true) {
    axios
      .delete(
        `https://project-1-api.herokuapp.com/comments/${e.target.value}${myKey2}`
      )
      .then((res) => {
        getComments();
      });
  }
};
