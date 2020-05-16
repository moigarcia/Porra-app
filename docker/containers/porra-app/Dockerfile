FROM node:8
LABEL maintainer "moi"

# React app path
ENV REACTAPP /opt/app

# Create container app directory
RUN mkdir -p $REACTAPP

WORKDIR $REACTAPP

ENV PATH $REACTAPP/node_modules/.bin:$PATH

# Name of user & group who runs react app
ENV PORRA_USER porra

# Create non privilege user as well as its group
RUN groupadd -r $PORRA_USER && useradd -m -r -g $PORRA_USER $PORRA_USER

# default port 3000 for react
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

# Copy package.json project from host to container
# COPY package.json $REACTAPP/package.json
COPY . .

# # Install dependencies for react project
# RUN yarn
RUN npm install --silent

# # Install react script package
# RUN yarn global add react-scripts@3.2.0

RUN npm install react-scripts@3.2.0 -g --silent

# Copy all react project from host to container
# COPY . $REACTAPP


# Change owner & group for react app path to ubati user
RUN chown -R $PORRA_USER:$PORRA_USER $REACTAPP

# Set user name for running the image in order to not to use root because of
# security
USER $PORRA_USER

# Run script for checking environment and webpack
CMD [ "npm", "start" ]