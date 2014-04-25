#!/bin/bash
  
  # Helpers
# -------

exitWithMessageOnError () {
  if [ ! $? -eq 0 ]; then
    echo "An error has occurred during web site deployment."
    echo $1
	echo 
   read line
  fi
}
  
if [ -e "Gruntfile.js" ]; then  
  grunt
  exitWithMessageOnError "grunt failed"  
fi  

read line