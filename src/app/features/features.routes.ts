import { Routes } from "@angular/router";
import { FeedComponent } from "./feed/feed.component";
import { ProfileComponent } from "./profile/profile.component";
import { NotificationComponent } from "./notification/notification.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";

export const routes : Routes = [
    {path : "feed" ,  component : FeedComponent} ,
    {path : "profile" , component : ProfileComponent} ,
    {path : "notification" , component : NotificationComponent} ,
    {path : "post-detail/:postId" , component : PostDetailComponent} ,
]