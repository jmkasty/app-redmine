package org.jhipster.redmine.web.rest;

import org.jhipster.redmine.JhipsterApp;

import org.jhipster.redmine.domain.UserRedmine;
import org.jhipster.redmine.repository.UserRedmineRepository;
import org.jhipster.redmine.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.jhipster.redmine.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserRedmineResource REST controller.
 *
 * @see UserRedmineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class UserRedmineResourceIntTest {

    private static final Integer DEFAULT_ID_USER_REDMINE = 1;
    private static final Integer UPDATED_ID_USER_REDMINE = 2;

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    @Autowired
    private UserRedmineRepository userRedmineRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserRedmineMockMvc;

    private UserRedmine userRedmine;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserRedmineResource userRedmineResource = new UserRedmineResource(userRedmineRepository);
        this.restUserRedmineMockMvc = MockMvcBuilders.standaloneSetup(userRedmineResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserRedmine createEntity(EntityManager em) {
        UserRedmine userRedmine = new UserRedmine()
            .id_user_redmine(DEFAULT_ID_USER_REDMINE)
            .login(DEFAULT_LOGIN);
        return userRedmine;
    }

    @Before
    public void initTest() {
        userRedmine = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserRedmine() throws Exception {
        int databaseSizeBeforeCreate = userRedmineRepository.findAll().size();

        // Create the UserRedmine
        restUserRedmineMockMvc.perform(post("/api/user-redmines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRedmine)))
            .andExpect(status().isCreated());

        // Validate the UserRedmine in the database
        List<UserRedmine> userRedmineList = userRedmineRepository.findAll();
        assertThat(userRedmineList).hasSize(databaseSizeBeforeCreate + 1);
        UserRedmine testUserRedmine = userRedmineList.get(userRedmineList.size() - 1);
        assertThat(testUserRedmine.getId_user_redmine()).isEqualTo(DEFAULT_ID_USER_REDMINE);
        assertThat(testUserRedmine.getLogin()).isEqualTo(DEFAULT_LOGIN);
    }

    @Test
    @Transactional
    public void createUserRedmineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userRedmineRepository.findAll().size();

        // Create the UserRedmine with an existing ID
        userRedmine.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserRedmineMockMvc.perform(post("/api/user-redmines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRedmine)))
            .andExpect(status().isBadRequest());

        // Validate the UserRedmine in the database
        List<UserRedmine> userRedmineList = userRedmineRepository.findAll();
        assertThat(userRedmineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserRedmines() throws Exception {
        // Initialize the database
        userRedmineRepository.saveAndFlush(userRedmine);

        // Get all the userRedmineList
        restUserRedmineMockMvc.perform(get("/api/user-redmines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userRedmine.getId().intValue())))
            .andExpect(jsonPath("$.[*].id_user_redmine").value(hasItem(DEFAULT_ID_USER_REDMINE)))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN.toString())));
    }

    @Test
    @Transactional
    public void getUserRedmine() throws Exception {
        // Initialize the database
        userRedmineRepository.saveAndFlush(userRedmine);

        // Get the userRedmine
        restUserRedmineMockMvc.perform(get("/api/user-redmines/{id}", userRedmine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userRedmine.getId().intValue()))
            .andExpect(jsonPath("$.id_user_redmine").value(DEFAULT_ID_USER_REDMINE))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserRedmine() throws Exception {
        // Get the userRedmine
        restUserRedmineMockMvc.perform(get("/api/user-redmines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserRedmine() throws Exception {
        // Initialize the database
        userRedmineRepository.saveAndFlush(userRedmine);
        int databaseSizeBeforeUpdate = userRedmineRepository.findAll().size();

        // Update the userRedmine
        UserRedmine updatedUserRedmine = userRedmineRepository.findOne(userRedmine.getId());
        // Disconnect from session so that the updates on updatedUserRedmine are not directly saved in db
        em.detach(updatedUserRedmine);
        updatedUserRedmine
            .id_user_redmine(UPDATED_ID_USER_REDMINE)
            .login(UPDATED_LOGIN);

        restUserRedmineMockMvc.perform(put("/api/user-redmines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserRedmine)))
            .andExpect(status().isOk());

        // Validate the UserRedmine in the database
        List<UserRedmine> userRedmineList = userRedmineRepository.findAll();
        assertThat(userRedmineList).hasSize(databaseSizeBeforeUpdate);
        UserRedmine testUserRedmine = userRedmineList.get(userRedmineList.size() - 1);
        assertThat(testUserRedmine.getId_user_redmine()).isEqualTo(UPDATED_ID_USER_REDMINE);
        assertThat(testUserRedmine.getLogin()).isEqualTo(UPDATED_LOGIN);
    }

    @Test
    @Transactional
    public void updateNonExistingUserRedmine() throws Exception {
        int databaseSizeBeforeUpdate = userRedmineRepository.findAll().size();

        // Create the UserRedmine

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserRedmineMockMvc.perform(put("/api/user-redmines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRedmine)))
            .andExpect(status().isCreated());

        // Validate the UserRedmine in the database
        List<UserRedmine> userRedmineList = userRedmineRepository.findAll();
        assertThat(userRedmineList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserRedmine() throws Exception {
        // Initialize the database
        userRedmineRepository.saveAndFlush(userRedmine);
        int databaseSizeBeforeDelete = userRedmineRepository.findAll().size();

        // Get the userRedmine
        restUserRedmineMockMvc.perform(delete("/api/user-redmines/{id}", userRedmine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserRedmine> userRedmineList = userRedmineRepository.findAll();
        assertThat(userRedmineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserRedmine.class);
        UserRedmine userRedmine1 = new UserRedmine();
        userRedmine1.setId(1L);
        UserRedmine userRedmine2 = new UserRedmine();
        userRedmine2.setId(userRedmine1.getId());
        assertThat(userRedmine1).isEqualTo(userRedmine2);
        userRedmine2.setId(2L);
        assertThat(userRedmine1).isNotEqualTo(userRedmine2);
        userRedmine1.setId(null);
        assertThat(userRedmine1).isNotEqualTo(userRedmine2);
    }
}
