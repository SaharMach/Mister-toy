import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export function AppFooter() {
   
    
    return (
        <footer class="app-footer">
         <div>
            <span><a href=""><FacebookIcon/></a>
            <a href=""><GitHubIcon /></a>
            <a href=""><LinkedInIcon /></a></span>

        </div>      
        <div>
            <a href="/">Terms</a> | 
            <a href="/">Privacy</a> | 
            <a href="/">Contact</a>
        </div>
        <span>&copy; 2023 Toy App</span>
    </footer>
    
    
    )
}
