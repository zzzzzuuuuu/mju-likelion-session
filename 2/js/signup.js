console.log('adafdasd');

const formEl = document.querySelector('#signupForm');
const idEl = document.querySelector('#signupId');
const passwordEl = document.querySelector('#signupPassword');

// user 있는지 확인
const isUserExist = (newUserId) => {
  const users = localStorage.getItem('userList'); // localStorage key, value로 이루어짐

  if(!users) return false;

  const convertedUsers = JSON.parse(users); // string->JSON 형태의 타입으로 변환
  const getExistUsers = convertedUsers.find(user => user.id === newUserId);

  return getExistUsers ? true : false;
};

const registerUser = (userInfo) => {
  const currentUsers = JSON.parse(localStorage.getItem('userList'));

  if(!currentUsers) { // 회원가입을 시켜야하니까...
    const newUserList = [];
    newUserList.push({
      id: userInfo.id,
      password: userInfo.password,
    });
    localStorage.setItem('userList', JSON.stringify(newUserList)); // 배열->stirng으로
  } else { // 이미 존재하면! 중복체크
    const updatedUsers = currentUsers.concat({
      id: userInfo.id,
      password:userInfo.password
    }); // 새 배열이 생김 (push와의 차이)

    localStorage.setItem('userList', JSON.stringify(updatedUsers));
  }
};

const init = () => { // 코드 흐름의 시작...
  //일급 객체... 자바스크립트는 파라미터 안에 함수를 넣을 수 있다...
  formEl.addEventListener('submit', (e) => {
    e.preventDefault(); // 새로고침 이벤트 막음

    const idValue = idEl.value;
    const passwordValue = passwordEl.value;

    if(isUserExist(idValue)) {
      alert(`${idValue} 유저는 이미 존재합니다!`);
      idEl.value = '';
      passwordEl.value = '';
      return;
    }

    // 회원가입이 가능하다면 이후 코드
    registerUser({id: idValue, password: passwordValue});
    alert('회원가입 완료!');
    location.href = './signin.html'; // ./
  });
}; 


document.addEventListener('DOMContentLoaded', init);