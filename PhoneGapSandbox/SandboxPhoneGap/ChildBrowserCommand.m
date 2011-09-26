//

// 
//
//  Created by Jesse MacFadyen on 10-05-29.
//  Copyright 2010 Nitobi. All rights reserved.
//

#import "ChildBrowserCommand.h"

#ifdef PHONEGAP_FRAMEWORK
	#import <PhoneGap/PhoneGapViewController.h>
	
#else
	#import "PhoneGapViewController.h"
#endif


@implementation ChildBrowserCommand

@synthesize childBrowser;


- (void) showWebPage:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options // args: url
{
    
  if(childBrowser == NULL)
  {
    childBrowser = [[ ChildBrowserViewController alloc ] initWithScale:FALSE ];
    childBrowser.delegate = self;
  }else{
    /* cemerson */  [childBrowser dismissModalViewControllerAnimated:NO];
  }
  
  /* // TODO: Work in progress
NSString* strOrientations = [ options objectForKey:@"supportedOrientations"];
NSArray* supportedOrientations = [strOrientations componentsSeparatedByString:@","];
*/
    
    PhoneGapViewController* cont = (PhoneGapViewController*)[ super appViewController ];
    
    /* cemerson */ cont.view.backgroundColor = [UIColor clearColor];

    childBrowser.supportedOrientations = cont.supportedOrientations;

    /* cemerson */ cont.modalPresentationStyle = UIModalPresentationCurrentContext;
   
     childBrowser.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;
    
    [ cont presentModalViewController:childBrowser animated:YES ];
   
    

    CGRect pdfFrame = CGRectMake(270, 10, 759, 758);
    // CGRect pdfBounds = CGRectMake(270, 0, 759, 768);
    /* cemerson */ childBrowser.view.frame = pdfFrame; // CGRectMake(0, 0, 600, 768);
    //childBrowser.view.bounds = pdfBounds;
    
  
  NSString *path = (NSString*) [arguments objectAtIndex:0];
  
  // ADDED Code
  // This breaks apart the path and uses the pathForResource method to correctly find the resource
  // in the bundle.
  NSString *ofType = [path pathExtension];
  NSString *pathForResource = [[[path lastPathComponent] componentsSeparatedByString:@"."] objectAtIndex:0];
  NSString *inDirectory = [path stringByDeletingLastPathComponent];
  
  NSString *url = [[NSBundle mainBundle] pathForResource:pathForResource
                          ofType:ofType
                          inDirectory:inDirectory];
    
  [childBrowser loadURL:url];


}




-(void) close:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options // args: url
{
	[ childBrowser closeBrowser];
	
}

-(void) onClose
{
	NSString* jsCallback = [NSString stringWithFormat:@"ChildBrowser._onClose();",@""];
	[self.webView stringByEvaluatingJavaScriptFromString:jsCallback];
}

-(void) onOpenInSafari
{
	NSString* jsCallback = [NSString stringWithFormat:@"ChildBrowser._onOpenExternal();",@""];
	[self.webView stringByEvaluatingJavaScriptFromString:jsCallback];
}


-(void) onChildLocationChange:(NSString*)newLoc
{
	
	NSString* tempLoc = [NSString stringWithFormat:@"%@",newLoc];
	NSString* encUrl = [tempLoc stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
	 
	NSString* jsCallback = [NSString stringWithFormat:@"ChildBrowser._onLocationChange('%@');",encUrl];
	[self.webView stringByEvaluatingJavaScriptFromString:jsCallback];

}




@end
