//
//  main.m
//  SandboxPhoneGap
//
//  Created by Chris Emerson on 9/23/11.
//  Copyright Emerson Design, Inc. 2011. All rights reserved.
//

#import <UIKit/UIKit.h>

int main(int argc, char *argv[]) {
    
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
    int retVal = UIApplicationMain(argc, argv, nil, @"AppDelegate");
    [pool release];
    return retVal;
}
