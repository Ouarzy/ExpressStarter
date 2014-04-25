#!/bin/bash
  
  # Helpers
# -------

exitWithMessageOnError () {
  if [ ! $? -eq 0 ]; then
    echo "An error has occurred during web site deployment."
    echo $1
   read line
  fi
}
  
if [ -e "Gruntfile.js" ]; then  
   grunt --stack
  exitWithMessageOnError "grunt failed"  
fi  

read line