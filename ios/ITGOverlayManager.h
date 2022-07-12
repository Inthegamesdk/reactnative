//
//  ITGOverlayManager.h
//  ITGRNExample-tvOS
//
//  Created by Tiago Lira Pereira on 06/07/2022.
//

#import <React/RCTViewManager.h>
//#import "ITGRNExample_tvOS-Swift.h"

NS_ASSUME_NONNULL_BEGIN

@interface ITGOverlayManager : RCTViewManager

@property (nonatomic, weak) UIView *overlayView;

@end

NS_ASSUME_NONNULL_END
