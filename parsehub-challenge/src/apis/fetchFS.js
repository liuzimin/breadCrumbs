export const getContents = async function(path) {
  return new Promise(function(resolve) {
    return setTimeout(function() {
      let root = {
        type: "dir",
        children: {
          home: {
            type: "dir",
            children: {
              myname: {
                type: "dir",
                children: {
                  "filea.txt": {
                    type: "file"
                  },
                  "fileb.txt": {
                    type: "file"
                  },
                  projects: {
                    type: "dir",
                    children: {
                      mysupersecretproject: {
                        type: "dir",
                        children: {
                          mysupersecretfile: {
                            type: "file"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };

      let dirNames = path.split("/");
      let resultFS = root;
      dirNames.forEach(function(key) {
        if (key !== "") {
          resultFS = resultFS.children[key];
        }
        if (resultFS === undefined) {
          resolve({ error: "Path does not Exist" });
        }
      });

      if (resultFS !== undefined) {
        let result = {
          type: resultFS.type,
          name: dirNames[dirNames.length - 1]
        };

        if (resultFS.type === "dir") {
          result["children"] = {};
          for (let [key, value] of Object.entries(resultFS.children)) {
            result["children"][key] = {
              type: value.type,
              name: key
            };
          }
        }
        resolve(result);
      }
    }, 500);
  });
};
