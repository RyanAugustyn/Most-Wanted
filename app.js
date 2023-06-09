function app(people) {
  displayWelcome();
  runSearchAndMenu(people);
  return exitOrRestart(people);
}

function displayWelcome() {
  alert("Hello and welcome to the Most Wanted search application!");
}

function runSearchAndMenu(people) {
  let searchResults = searchPeopleDataSet(people);

  while (searchResults.length > 1) {
    console.log(searchResults);
    displayPeople("Search Results", searchResults);
    alert(
      `There are ${searchResults.length} results, please choose another trait to filter further...`
    );
    searchResults = searchByTraits(searchResults);
  }
  if (searchResults.length === 1) {
    const person = searchResults[0];
    mainMenu(person, people);
  } else {
    alert("No one was found in the search.");
  }
}

function searchPeopleDataSet(people) {
  const searchTypeChoice = validatedPrompt(
    "Please enter in what type of search you would like to perform.",
    ["id", "name", "traits"]
  );

  let results = [];
  switch (searchTypeChoice) {
    case "id":
      results = searchById(people);
      break;
    case "name":
      results = searchByName(people);
      break;
    case "traits":
      //! TODO
      results = searchByTraits(people);
      break;
    default:
      return searchPeopleDataSet(people);
  }

  return results;
}

function searchById(people) {
  const idToSearchForString = prompt(
    "Please enter the id of the person you are searching for."
  );
  const idToSearchForInt = parseInt(idToSearchForString);
  const idFilterResults = people.filter(
    (person) => person.id === idToSearchForInt
  );
  return idFilterResults;
}

function searchByName(people) {
  const firstNameToSearchFor = prompt(
    "Please enter the the first name of the person you are searching for."
  );
  const lastNameToSearchFor = prompt(
    "Please enter the the last name of the person you are searching for."
  );
  const fullNameSearchResults = people.filter(
    (person) =>
      person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() &&
      person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()
  );
  return fullNameSearchResults;
}

function mainMenu(person, people) {
  const mainMenuUserActionChoice = validatedPrompt(
    `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
    ["info", "family", "descendants", "quit"]
  );

  switch (mainMenuUserActionChoice) {
    case "info":
      //! TODO
      displayPersonInfo(person);
      break;
    case "family":
      //! TODO
      findPersonFamily(person, people);
      //displayPeople('Family', personFamily);
      break;
    case "descendants":
      //! TODO
      let personDescendants = findPersonDescendants(person, people);

      if (personDescendants.length === 1) {
        displayPersonInfo(personDescendants[0]);
      } else {
        displayPeople("Descendants", personDescendants);
      }
      break;
    case "quit":
      return;
    default:
      alert("Invalid input. Please try again.");
  }

  return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay) {
  const formatedPeopleDisplayText = peopleToDisplay
    .map((person) => `${person.firstName} ${person.lastName}`)
    .join("\n");
  alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
  acceptableAnswers = acceptableAnswers.map((aa) => aa.toLowerCase());

  const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers
    .map((aa) => `\n-> ${aa}`)
    .join("")}`;

  const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

  if (acceptableAnswers.includes(userResponse)) {
    return userResponse;
  } else {
    alert(
      `"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers
        .map((aa) => `\n-> ${aa}`)
        .join("")} \n\nPlease try again.`
    );
    return validatedPrompt(message, acceptableAnswers);
  }
}

function exitOrRestart(people) {
  const userExitOrRestartChoice = validatedPrompt(
    "Would you like to exit or restart?",
    ["exit", "restart"]
  );

  switch (userExitOrRestartChoice) {
    case "exit":
      return;
    case "restart":
      return app(people);
    default:
      alert("Invalid input. Please try again.");
      return exitOrRestart(people);
  }
}

function searchByTraits(people) {
  const traitToSearchFor = validatedPrompt(
    "Which trait would you like to search for?",
    ["gender", "height", "weight", "eye color", "occupation", "quit"]
  );

  let peopleResults = [];
  switch (traitToSearchFor) {
    case "gender":
      let genderToSearchFor = validatedPrompt(
        "Which gender would you like to search for?",
        ["male", "female"]
      );
      peopleResults = people.filter(
        (person) => person["gender"] === genderToSearchFor
      );
      break;
    case "height":
      let heightToSearchFor = promptReturnNumber(
        "What height would you like to search for?"
      );
      peopleResults = people.filter(
        (person) => person["height"] === heightToSearchFor
      );
      break;
    case "weight":
      let weightToSearchFor = promptReturnNumber(
        "What weight would you like to search for?"
      );
      peopleResults = people.filter(
        (person) => person["weight"] === weightToSearchFor
      );
      break;
    case "eye color":
      let eyeColorToSearchFor = validatedPrompt(
        "What eye color would you like to search for?",
        getAllEyeColors(people)
      );
      peopleResults = people.filter(
        (person) => person["eyeColor"] === eyeColorToSearchFor
      );
      break;
    case "occupation":
      let occupationToSearchFor = validatedPrompt(
        "What occupation would you like to search for?",
        getAllOccupations(people)
      );
      peopleResults = people.filter(
        (person) => person["occupation"] === occupationToSearchFor
      );
      break;
    default:
      peopleResults = [];
  }

  return peopleResults;
}

function promptReturnNumber(message) {
  const userResponse = prompt(message);

  const userResponseAsNumber = Number(userResponse);

  if (!isNaN(userResponseAsNumber)) {
    return userResponseAsNumber;
  } else {
    alert(`"${userResponse}" is not an acceptable response. Please try again.`);
    return promptReturnNumber(message);
  }
}

function getAllEyeColors(people) {
  let eyeSet = new Set();

  people.forEach((person) => eyeSet.add(person["eyeColor"]));
  return Array.from(eyeSet);
}

function getAllOccupations(people) {
  let occupationSet = new Set();

  people.forEach((person) => occupationSet.add(person["occupation"]));
  return Array.from(occupationSet);
}

function displayPersonInfo(person) {
  alert(`ID: ${person.id}
        First Name: ${person.firstName}
        Last Name: ${person.lastName} 
        Gender: ${person.gender}
        DOB: ${person.dob}
        Height: ${person.height}
        Weight: ${person.weight}
        Eye Color: ${person.eyeColor}
        Occupation: ${person.occupation}
        Parents ID: ${person.parents}
        Current Spouse ID: ${person.currentSpouse}`);
}

function findPersonFamily(person, people) {
  let spouse = people.filter(function (member) {
    if (person.id == member.currentSpouse) {
      return true;
    }
  });

  let parents = people.filter(function (member) {
    return person.parents.includes(member.id);
  });
  /*let parents = [];
  for(let i = 0; i < person.parents.length; i++)
    parents.push(searchById(person.parents[i]));*/

  let siblings = new Set();
  if (parents.length > 0) siblings = new Set(findChildren(parents[0], people));
  //if(parents.length == 2)
  //  siblings = new Set(...siblings.concat(findChildren(parents[1], people)), ...siblings);

  siblings = [...siblings];
  siblings = siblings.filter((sibling) => person.id != sibling.id);

  displayPeople("Spouse", spouse);
  displayPeople("Parents", parents);
  displayPeople("Siblings", siblings);
}

function findChildren(person, people) {
  let children = people.filter((personChecking) => {
    let isParent = false;
    personChecking["parents"].forEach((parentID) => {
      if (parentID === person.id) isParent = true;
    });
    return isParent;
  });

  return children;
}

function findPersonDescendants(person, people) {
  let children = people.filter((personChecking) => {
    let isParent = false;
    personChecking["parents"].forEach((parentID) => {
      if (parentID === person.id) isParent = true;
    });
    return isParent;
  });

  if (children.length === 0) {
    return [];
  } else {
    let subChildren = [];
    for (let i = 0; i < children.length; i++) {
      subChildren = subChildren.concat(
        findPersonDescendants(children[i], people)
      );
    }

    return children.concat(subChildren);
  }
}
