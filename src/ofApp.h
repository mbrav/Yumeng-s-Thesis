#ifndef _TEST_APP
#define _TEST_APP

#include "ofMain.h"
#include "ofVboMesh.h"
#include "ofxAssimpModelLoader.h"

#include "ofModel.h"

class ofApp : public ofBaseApp {

public:
  void setup();
  void update();
  void draw();

  void keyPressed(int key);
  void keyReleased(int key);
  void mouseMoved(int x, int y);
  void mouseDragged(int x, int y, int button);
  void mousePressed(int x, int y, int button);
  void mouseReleased(int x, int y, int button);
  void mouseEntered(int x, int y);
  void mouseExited(int x, int y);
  void windowResized(int w, int h);
  void dragEvent(ofDragInfo dragInfo);
  void gotMessage(ofMessage msg);

  const int modelFiles = 6; // number of file models
  const int modelNum = 40; // number of total models to display

  vector<ofModel> models;
  ofModel myModel;

  vector<ofPlanePrimitive> plane;

  ofLight light;

	ofEasyCam camera;

  unsigned int loop;

};

#endif
