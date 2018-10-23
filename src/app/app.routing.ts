import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component"
import { AddComponent } from "./components/add/add.component";
import { EditComponent } from "./components/edit/edit.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { AuthGuard } from "./navigation/guards/auth.guard";
import { LandingComponent } from "./components/landing/landing.component";

const routes : Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: 'landing', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add', component: AddComponent, canActivate: [ AuthGuard ] },
    { path: 'edit/:id', component: EditComponent, canActivate: [ AuthGuard ] },
    { path: '**', component: HomeComponent, canActivate: [ AuthGuard ] }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
