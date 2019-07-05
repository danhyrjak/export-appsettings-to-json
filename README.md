# Export App Settings To JSON

## Overview

this project contains a custom VSTS build/release task and can be used to read all variables prefixed with **appsetting.** and outputs these as a JSON formatted object in a file (fullpath to this output .json file must be specficed as a parameter).

## Usage

The property names in the outputed JSON file will match the casing supplied in the variable name, with the prefix removed.

The task will overwrite any existing file that exists at the specified path.

### Property Types

The task also supports the following optional types:

* string (default)
* number
* bool (enter **true** for true, any other value will be considered false)

type is specifed at the second postion of the name prefix. For example to specify the property named *thisIsANum* is a number you would give it the variable name of:
**appsetting.number.thisIsANum**.

Note: If no known type is specifed then a string type is presumed. For example the following variable will output a string variable named *thisIsAString*: **appsetting.thisIsAString** which is therefore equivalent to **appsetting.string.thisIsAString**.

## Build

### Prerequisites

 To build this solution you must have node.js globally installed along with the **tfx-cli** npm package and TypeScript.

### Build Steps

 1. Run **npm install** to install the project dependancies.

 2. Update the publisher field in vss-extensions.json to match the publisher you wish to deploy this task under.

 3. change directory into the **exportAppSettingsToJson** and run the **tsc** command to generate index.js from the index.ts file.

 4. change directory back to the root of the project and run **tfx extension create** to build a release zip of the extension ready for upload to the marketplace.

## References

I used the following article as refrence when building this release task:
<https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops>
