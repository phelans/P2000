//
//  ChildBrowserViewController.m
//
//  Created by Jesse MacFadyen on 21/07/09.
//  Copyright 2009 Nitobi. All rights reserved.
//

#import "ChildBrowserViewController.h"


@implementation ChildBrowserViewController

@synthesize imageURL;
@synthesize supportedOrientations;
@synthesize isImage;
@synthesize delegate;

/*
 // The designated initializer.  Override if you create the controller programmatically and want to perform customization that is not appropriate for viewDidLoad.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    if (self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil]) {
        // Custom initialization
    }
    return self;
}
*/

+ (NSString*) resolveImageResource:(NSString*)resource
{
	NSString* systemVersion = [[UIDevice currentDevice] systemVersion];
	BOOL isLessThaniOS4 = ([systemVersion compare:@"4.0" options:NSNumericSearch] == NSOrderedAscending);
	
	// the iPad image (nor retina) differentiation code was not in 3.x, and we have to explicitly set the path
	if (isLessThaniOS4)
	{
        return [NSString stringWithFormat:@"%@.png", resource];
	}
	
	return resource;
}


- (ChildBrowserViewController*)initWithScale:(BOOL)enabled
{
    self = [super init];
    
	scaleEnabled = enabled;  
    
	return self;	
}

// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
    
	refreshBtn.image = [UIImage imageNamed:[[self class] resolveImageResource:@"ChildBrowser.bundle/but_refresh"]];
	backBtn.image = [UIImage imageNamed:[[self class] resolveImageResource:@"ChildBrowser.bundle/arrow_left"]];
	fwdBtn.image = [UIImage imageNamed:[[self class] resolveImageResource:@"ChildBrowser.bundle/arrow_right"]];
	safariBtn.image = [UIImage imageNamed:[[self class] resolveImageResource:@"ChildBrowser.bundle/compass"]];

	webView.delegate = self;
	webView.scalesPageToFit = TRUE;
	//webView.opaque = NO;
    //webView.backgroundColor = [UIColor clearColor];
    // webView.backgroundColor = [UIColor clearColor];
   
    [webView setHidden:YES]; 
    
    [self setBackgroundToClearForView:childBrowserView];

    // cemerson@ webView.bounds = CGRectMake(300, 0, 650, 768);
	NSLog(@"View did load");
}


- (void)setBackgroundToClearForView:(UIView *)view {
    if ([view subviews]) {
        for (UIView *subView in [view subviews]) {
            [self setBackgroundToClearForView:subView];
        }
    }
    
    if ([view respondsToSelector:@selector(setBackgroundColor:)]) {
        [view performSelector:@selector(setBackgroundColor:)
                   withObject:[UIColor clearColor]];
    }
}





                


- (void)didReceiveMemoryWarning {
	// Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
	
	// Release any cached data, images, etc that aren't in use.
}

- (void)viewDidUnload {
	// Release any retained subviews of the main view.
	// e.g. self.myOutlet = nil;
	NSLog(@"View did UN-load");
}


- (void)dealloc {

	webView.delegate = nil;
	
	[webView release];
	[closeBtn release];
	[refreshBtn release];
	[addressLabel release];
	[backBtn release];
	[fwdBtn release];
	[safariBtn release];
	[spinner release];
	[ supportedOrientations release];
	[super dealloc];
}

-(void)closeBrowser
{
	
	if(delegate != NULL)
	{
		[delegate onClose];		
	}
	
	[ [super parentViewController] dismissModalViewControllerAnimated:YES];
}

-(IBAction) onDoneButtonPress:(id)sender
{
	[ self closeBrowser];

    NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:@"about:blank"]];
    [webView loadRequest:request];
}


-(IBAction) onSafariButtonPress:(id)sender
{
	
	if(delegate != NULL)
	{
		[delegate onOpenInSafari];		
	}
	
	if(isImage)
	{
		NSURL* pURL = [ [NSURL alloc] initWithString:imageURL ];
		[ [ UIApplication sharedApplication ] openURL:pURL  ];
	}
	else
	{
		NSURLRequest *request = webView.request;
		[[UIApplication sharedApplication] openURL:request.URL];
	}

	 
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation) interfaceOrientation 
{
	BOOL autoRotate = [self.supportedOrientations count] > 1; // autorotate if only more than 1 orientation supported
	if (autoRotate)
	{
		if ([self.supportedOrientations containsObject:
			 [NSNumber numberWithInt:interfaceOrientation]]) {
			return YES;
		}
    }
	
	return NO;
}


/* - original -

- (void)loadURL:(NSString*)url
{
	NSLog(@"Opening Url : %@",url);
	 
	if( [url hasSuffix:@".png" ]  || 
	    [url hasSuffix:@".jpg" ]  || 
		[url hasSuffix:@".jpeg" ] || 
		[url hasSuffix:@".bmp" ]  || 
		[url hasSuffix:@".gif" ]  )
	{
		[ imageURL release ];
		imageURL = [url copy];
		isImage = YES;
		NSString* htmlText = @"<html><body style='background-color:#333;margin:0px;padding:0px;'><img style='min-height:200px;margin:0px;padding:0px;width:100%;height:auto;' alt='' src='IMGSRC'/></body></html>";
		htmlText = [ htmlText stringByReplacingOccurrencesOfString:@"IMGSRC" withString:url ];

		[webView loadHTMLString:htmlText baseURL:[NSURL URLWithString:@""]];
		
	}
	else
	{
		imageURL = @"";
		isImage = NO;
		NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:url]];
		[webView loadRequest:request];
	}
	webView.hidden = NO;
}
*/

- (void)loadURL:(NSString*)url
{
  NSLog(@"Opening Url : %@",url);

  imageURL = @"";
  isImage = NO;
  // ADDED Code
  // use fileURLWithPath method instead
  NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL fileURLWithPath:url]];
  [webView loadRequest:request];

  webView.hidden = NO;
    
    // cemerson - from http://devjoe.com/?p=8
    // webView.scalesPageToFit = YES;
    //webView.backgroundColor = [UIColor clearColor];
    // webView.opaque = NO;    
    //for (int x = 0;x<10;x++){[[[[[webView subviews] objectAtIndex:0] subviews] objectAtIndex:x] setHidden:YES];}
    

}


- (void)webViewDidStartLoad:(UIWebView *)sender {
	addressLabel.text = @"Loading...";
	backBtn.enabled = webView.canGoBack;
	fwdBtn.enabled = webView.canGoForward;
	
	[ spinner startAnimating ];
	
}

- (void)webViewDidFinishLoad:(UIWebView *)sender 
{
	NSURLRequest *request = webView.request;
	NSLog(@"New Address is : %@",request.URL.absoluteString);
	addressLabel.text = request.URL.absoluteString;
	backBtn.enabled = webView.canGoBack;
	fwdBtn.enabled = webView.canGoForward;
	[ spinner stopAnimating ];
	
	if(delegate != NULL)
	{
		[delegate onChildLocationChange:request.URL.absoluteString];		
	}
    
    // cemerson - from http://devjoe.com/?p=8
    webView.scalesPageToFit = YES;
    //webView.backgroundColor = [UIColor clearColor];
    //webView.opaque = NO;    
    //for (int x = 0;x<10;x++){[[[[[webView subviews] objectAtIndex:0] subviews] objectAtIndex:x] setHidden:YES];}

    webView.hidden = NO;
    // webView.alpha = 0.5;
    
    // childBrowserView.opaque = NO;
    // childBrowserView.backgroundColor = [UIColor clearColor];
    // childBrowserView.backgroundColor = [UIColor colorWithWhite:0.75f alpha:1.0f];
    self.view.backgroundColor = [UIColor clearColor];
    self.view.opaque = YES;

}
/* 
-(void)showLoadingView
{
	CGRect transparentViewFrame = CGRectMake(0.0, 0.0,320.0,480.0);
	childBrowserView = [[UIView alloc] initWithFrame:transparentViewFrame];
	childBrowserView.backgroundColor = [UIColor lightGrayColor];
	childBrowserView.alpha = 0.9;

	[self.view addSubview:childBrowserView];

	[childBrowserView release];
}



-(void)myAction:(id)sender
{
	[self showLoadingView];
    
	[self performSelectorInBackground:@selector(myActionBackground:) withObject:sender];
}

-(void)myActionBackground:(id)sender
{
    NSAutoreleasePool *apool = [[NSAutoreleasePool alloc] init];
	//your code
    [apool release];

}*/


@end
