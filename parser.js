
function literal(lit) {
  return function({input, ast}) {
    if (input.indexOf(lit) === 0) {
      return {input: input.substr(lit.length), ast};
    } else {
      return {
        error: `expected ${lit}, but got ${input.substr(0, lit.length)}...`,
      };
    }
  };
}

function optional(child) {
  return function(arg) {
    const result = child(arg);
    if (result.error) {
      return arg; // as if nothing happened
    } else {
      return result;
    }
  };
}

function seq() {
  const children = arguments;
  return function(arg) {
    let nextArg = arg;
    for(let i=0; i < children.length; i++) {
      const child = children[i];
      nextArg = child(nextArg);
      if (nextArg.error) {
        return nextArg;
      }
    }
    return nextArg;
  };
}

function or() {
  const children = arguments;
  return function(arg) {
    for(let i=0; i < children.length; i++) {
      const child = children[i];
      const childResult = child(arg);
      if (!childResult.error) {
        return childResult;
      }
    }
    return nextArg;
  };  
}

function assoc(obj, key, val) {
  const kv = {};
  kv[key] = val;
  return Object.assign({}, obj, kv);
}

function param(name, re = /^[a-z]+/, parse = String) {
  return function({input, ast}) {
    const match = re.exec(input);
    if (match) {
      return {
        input: match.input.substr(match.index + match[0].length),
        ast: assoc(ast, name, parse(match[0])),
      };
    } else {
      return {error: 'Did not match ' + re};
    }
  };
}

function exhaustive(child) {
  return function(arg) {
    const result = child(arg);
    if (result.input.length > 0) {
      return { error: 'Was meant to be exhaustive, but look at this remainder: ' + result.input };
    } else {
      return result;
    }
  }

}

module.exports = {
  literal,
  optional,
  seq,
  or,
  param,
  exhaustive
};
